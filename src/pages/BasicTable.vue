<template>
  <div class="basic-table vm-margin">
    <VmTable title="我的数字藏品版权" :columns="dataColumns" :data="dataTable"></VmTable>
    
    <!-- 发布版权弹窗 -->
    <Modal v-model="publishModal" title="发布版权到交易市场" width="500">
      <div v-if="selectedCopyright" class="publish-form">
        <div class="copyright-info">
          <h3>{{ selectedCopyright.title }}</h3>
          <p><strong>描述：</strong> {{ selectedCopyright.description }}</p>
          <p><strong>类别：</strong> {{ selectedCopyright.category }}</p>
          <p><strong>创建时间：</strong> {{ formatDateTime(selectedCopyright.createdTime) }}</p>
          
          <div class="copyright-image" v-if="selectedCopyright.imgUrl">
            <img :src="'/api/uploads/' + selectedCopyright.imgUrl" alt="版权图片" style="max-width: 100%; max-height: 200px;">
          </div>
          
          <div class="price-input">
            <p><strong>请输入发布价格：</strong></p>
            <InputNumber 
              v-model="publishPrice" 
              :min="0.01" 
              :step="0.1" 
              style="width: 200px"
              placeholder="请输入价格">
            </InputNumber>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="publishModal = false" :disabled="publishing">取消</Button>
        <Button 
          type="primary" 
          @click="confirmPublish" 
          :disabled="!publishPrice || publishing"
          :loading="publishing">
          {{ publishing ? '交易处理中...' : '确认发布' }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import VmTable from '@/components/vm-table'
  import axios from 'axios'
  import Web3 from 'web3'
  import { abi } from '../contracts/CopyrightNFT.json'
  import { contractAddress } from '../contracts/config'

  export default {
    name: 'BasicTable',
    components: {
      VmTable
    },
    data () {
      return {
        dataColumns: [
          {
            id: '2.140710',
            title: 'ID',
            key: 'id',
            sortable: true
          },
          {
            id: '2.140711',
            title: '标题',
            key: 'title',
            sortable: true
          },
          {
            id: '2.140712',
            title: '状态',
            key: 'status',
            sortable: true
          },
          {
            id: '2.140713',
            title: '类别',
            key: 'category',
            sortable: true
          },
          {
            id: '2.140714',
            title: '创建时间',
            key: 'createdTime',
            sortable: true,
            render: (h, params) => {
              return h('div', this.formatDateTime(params.row.createdTime))
            }
          },
          {
            id: '2.140715',
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status !== 'APPROVED'
                  },
                  on: {
                    click: () => {
                      this.openPublishModal(params.row)
                    }
                  }
                }, '发布')
              ])
            }
          }
        ],
        dataTable: [],
        publishModal: false,
        selectedCopyright: null,
        publishPrice: null,
        publishing: false,
        web3: null,
        contract: null
      }
    },
    async created() {
      await this.initWeb3()
    },
    mounted() {
      this.loadAllCopyrights()
    },
    activated() {
      this.loadAllCopyrights()
    },
    methods: {
      async initWeb3() {
        if (window.ethereum) {
          try {
            // 请求用户授权
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            this.web3 = new Web3(window.ethereum)
            // 初始化合约
            this.contract = new this.web3.eth.Contract(abi, contractAddress)
          } catch (error) {
            console.error('Error initializing web3:', error)
          }
        } else {
          console.warn('MetaMask not detected')
        }
      },
      loadAllCopyrights() {
        axios.get('/api/jdbc/copyright/all')
          .then(response => {
            this.dataTable = response.data
          })
          .catch(error => {
            console.error('Failed to load copyrights:', error)
          })
      },
      formatDateTime(dateTimeStr) {
        if (!dateTimeStr) return '';
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
      },
      openPublishModal(copyright) {
        if (copyright.status !== 'APPROVED') {
          this.$Message.warning('只有审核通过的版权才能发布到交易市场');
          return;
        }
        this.selectedCopyright = copyright;
        this.publishPrice = null;
        this.publishModal = true;
      },
      async confirmPublish() {
        if (!this.publishPrice || this.publishPrice <= 0) {
          this.$Message.warning('请输入有效的价格')
          return
        }
        this.publishing = true
        // 区块链交易结果标志
        let blockchainSuccess = false
        try {
          // 1. 准备基础数据
          const accounts = await this.web3.eth.getAccounts()
          const account = accounts[0]
          // 准备上架元数据
          const metadata = {
            id: this.selectedCopyright.id,
            title: this.selectedCopyright.title,
            description: this.selectedCopyright.description,
            price: this.publishPrice,
            owner: account,
            status: 'LISTED'
          }
          try {
            // 2. 尝试区块链交易
            if (!this.web3 || !this.contract) {
              await this.initWeb3()
              if (!this.web3 || !this.contract) {
                console.warn('MetaMask钱包未连接，将跳过区块链记录')
              }
            }
            if (this.web3 && this.contract) {
              const priceInWei = this.web3.utils.toWei(this.publishPrice.toString(), 'ether')
              console.log('尝试区块链交易...')
              // 查看合约中实际可用的方法
              const methodNames = Object.keys(this.contract.methods)
              console.log('合约中可用的方法:', methodNames)
              // 尝试调用mint方法（从ABI看，这是最可能的方法）
              if (methodNames.includes('mint')) {
                console.log('找到 mint 方法，正在调用...')
                await this.contract.methods
                  .mint(account, JSON.stringify(metadata))
                  .send({ from: account })
                console.log('mint 方法调用成功')
                blockchainSuccess = true
              } else if (methodNames.includes('listToken')) {
                console.log('找到 listToken 方法，正在调用...')
                await this.contract.methods
                  .listToken(this.selectedCopyright.id, JSON.stringify(metadata), priceInWei)
                  .send({ from: account })
                console.log('listToken 方法调用成功')
                blockchainSuccess = true
              } else if (methodNames.includes('createToken')) {
                console.log('找到 createToken 方法，正在调用...')
                await this.contract.methods
                  .createToken(JSON.stringify(metadata), priceInWei)
                  .send({ from: account })
                console.log('createToken 方法调用成功')
                blockchainSuccess = true
              } else if (methodNames.includes('list') || methodNames.includes('listCopyright')) {
                const method = methodNames.includes('list') ? 'list' : 'listCopyright'
                console.log(`找到 ${method} 方法，正在调用...`)
                await this.contract.methods[method](this.selectedCopyright.id, JSON.stringify(metadata), priceInWei)
                  .send({ from: account })
                console.log(`${method} 方法调用成功`)
                blockchainSuccess = true
              } else {
                console.warn('找不到合约中适合的方法，将跳过区块链记录')
              }
            }
          } catch (blockchainError) {
            console.error('区块链交易失败:', blockchainError)
            // 区块链交易失败，但继续数据库操作
          }
          // 3. 无论区块链是否成功，更新数据库
          await axios.post(`/api/jdbc/copyright/${this.selectedCopyright.id}/list`, null, {
            params: {
              price: this.publishPrice
            }
          })
          this.$Message.success(blockchainSuccess
            ? '版权已成功发布到交易市场，并记录在区块链上'
            : '版权已发布到交易市场，但未能记录到区块链')
          this.publishModal = false
          this.loadAllCopyrights()
        } catch (error) {
          console.error('发布失败:', error)
          this.$Message.error('发布失败: ' + (error.message || '未知错误'))
        } finally {
          this.publishing = false
        }
      }
    }
  }
</script>

<style scoped>
  .basic-table {
    width: 100%;
  }
  
  .copyright-info {
    margin-bottom: 20px;
  }
  
  .copyright-info h3 {
    margin-bottom: 15px;
    color: #17233d;
  }
  
  .copyright-info p {
    margin-bottom: 10px;
  }
  
  .copyright-image {
    margin: 15px 0;
    text-align: center;
  }
  
  .price-input {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #e8eaec;
  }
</style>
