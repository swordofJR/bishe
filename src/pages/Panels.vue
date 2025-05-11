<template>
   <div class="panel-form vm-margin">
    <Form :model="formItem" :label-width="100">
      <FormItem label="版权全称" required>
        <Input v-model="formItem.title" placeholder="请输入版权完整名称" style="width: 400px"></Input>
      </FormItem>
      
      <FormItem label="版权信息描述" required>
        <Input v-model="formItem.description" type="textarea" :rows="4" style="width: 400px"></Input>
      </FormItem>

      <FormItem label="版权图片" required>
        <Upload 
          ref="upload"
          :before-upload="handleBeforeUpload"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleSizeError"
          :show-upload-list="false"
          accept="image/*">
          <div class="upload-area">
            <Icon type="ios-cloud-done" size="52" style="color: #1890ff"></Icon>
            <p class="upload-text">点击上传图片</p>
            <div v-if="previewImage" class="preview-image">
              <img :src="previewImage" alt="预览">
              <p class="file-name">{{ fileName }}</p>
            </div>
          </div>
        </Upload>
      </FormItem>

      <FormItem label="版权类别" required>
        <Select v-model="formItem.category" style="width: 400px">
          <Option v-for="(cat, index) in categories" 
                 :value="index" 
                 :key="index">{{ cat }}</Option>
        </Select>
      </FormItem>

      <!-- <FormItem label="交易起始价(ETH)" required>
        <InputNumber 
          v-model="formItem.startPrice" 
          :min="0.01" 
          :step="0.1"
          style="width: 400px"
          placeholder="输入起始价格"></InputNumber>
      </FormItem>

      <FormItem label="数字藏品铸造时间" required>
        <DatePicker 
          v-model="formItem.startTime" 
          type="datetime" 
          style="width: 400px"
          placeholder="请选择日期"></DatePicker>
      </FormItem>

      <FormItem label="交易持续时间" required>
        <InputNumber 
          v-model="formItem.duration" 
          :min="1" 
          :max="30"
          style="width: 400px"
          placeholder="输入天数"></InputNumber>
        <span class="ml-10">天</span>
      </FormItem> -->

      <FormItem>
        <Button 
          type="primary" 
          @click="submit"
          :loading="loading"
          :disabled="!formValid"
          style="width: 400px">
          提交版权信息
        </Button>
      </FormItem>
    </Form>

    <!-- Success Dialog -->
    <Modal
      v-model="showSuccessDialog"
      title="提交成功"
      @on-ok="handleSuccessOk"
      @on-cancel="handleSuccessOk">
      <p>您的版权信息已成功提交！</p>
    </Modal>
  </div>
</template>

<script>
import Web3 from 'web3';
import { abi } from '../contracts/CopyrightNFT.json';
import { contractAddress } from '../contracts/config';

export default {
  data() {
    return {
      loading: false,
      showSuccessDialog: false,
      categories: ['艺术品', '收藏品', '电子产品', '宠物', '游戏', '生活', '旅行'],
      previewImage: '',
      fileName: '',
      web3: null,
      contract: null,
      formItem: {
        title: '',
        description: '',
        imageData: null,
        category: 0,
        startTime: '',
      }
    }
  },
  computed: {
    formValid() {
      return this.formItem.title &&
             this.formItem.description &&
             this.formItem.imageData
    }
  },
  async created() {
    await this.initWeb3();
  },
  methods: {
    async initWeb3() {
      if (window.ethereum) {
        try {
          // 请求用户授权
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.web3 = new Web3(window.ethereum);
          // 初始化合约
          this.contract = new this.web3.eth.Contract(abi, contractAddress);
          // 监听账户变化
          window.ethereum.on('accountsChanged', (accounts) => {
            console.log('Account changed:', accounts);
          });
          // 监听网络变化
          window.ethereum.on('chainChanged', (chainId) => {
            console.log('Chain changed:', chainId);
            window.location.reload();
          });
        } catch (error) {
          console.error('Error initializing web3:', error);
          this.$Message.error('初始化区块链失败，请检查MetaMask');
        }
      } else {
        this.$Message.error('请安装MetaMask钱包');
      }
    },

    async submit() {
      if (!this.web3 || !this.contract) {
        this.$Message.error('请先连接MetaMask钱包');
        return;
      }

      this.loading = true;
      try {
        const accounts = await this.web3.eth.getAccounts();
        const account = accounts[0];

        // 准备NFT元数据
        const metadata = {
          name: this.formItem.title,
          description: this.formItem.description,
          image: this.formItem.imageData,
          category: this.categories[this.formItem.category],
          timestamp: this.formItem.startTime,
        };

        // 调用合约的mint函数
        const result = await this.contract.methods
          .mint(account, JSON.stringify(metadata))
          .send({ from: account });

        console.log('Transaction hash:', result.transactionHash);
        // 在Ganache中查看交易
        const transaction = await this.web3.eth.getTransaction(result.transactionHash);
        console.log('Transaction details:', transaction);

        this.showSuccessDialog = true;
        this.$Message.success('版权信息已成功上链！');
      } catch (error) {
        console.error('Error submitting:', error);
        this.$Message.error('提交失败：' + error.message);
      } finally {
        this.loading = false;
      }
    },

    handleBeforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        this.fileName = file.name;
        this.formItem.imageData = e.target.result;
      };
      reader.readAsDataURL(file);
      return false;
    },

    handleFormatError(file) {
      this.$Message.error('文件格式不正确，仅支持 JPG/PNG 格式');
    },

    handleSizeError(file) {
      this.$Message.error('文件大小超过2MB限制');
    },

    handleSuccessOk() {
      this.showSuccessDialog = false;
      this.formItem = {
        title: '',
        description: '',
        imageData: null,
        category: 0,
        startTime: '',
      };
      this.previewImage = '';
      this.fileName = '';
    }
  }
}
</script>

<style scoped>
.panel-form {
  text-align: left;
  position: relative;
  padding: 40px;
  background-image: url('../assets/img/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.panel-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
}

.panel-form > * {
  position: relative;
  z-index: 2;
}

.upload-area {
  padding: 20px;
  text-align: left;
  border: 1px dashed #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s ease;
  background-color: rgba(250, 250, 250, 0.9);
  width: 400px;
}

.upload-text {
  margin-top: 10px;
  text-align: left;
}

.upload-area:hover {
  border-color: #1890ff;
  background-color: #f0f7ff;
}

.preview-image {
  margin-top: 20px;
  text-align: left;
}

.preview-image img {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.file-name {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  text-align: left;
}

.ml-10 {
  margin-left: 10px;
}

.ivu-form-item {
  margin-bottom: 24px;
}

.ivu-form-item-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.ivu-input-wrapper, .ivu-select, .ivu-date-picker, .ivu-input-number {
  text-align: left;
}
</style>
