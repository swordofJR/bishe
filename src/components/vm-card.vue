<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="img" alt="">
      <div v-if="editable && type == 'vertical'" class="control">
        <span class="edit">
          <i class="fa fa-shopping-bag" @click="openBuyModal"></i>
        </span>
      </div>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ title }}</h2>
      <p>{{ desc }}</p>
      <a :href="detailUrl">
        <!-- more > -->
      </a>
    </div>

    <!-- 购买确认弹窗 -->
    <Modal
      v-model="showBuyModal"
      title="确认购买"
      @on-ok="handleBuy"
      @on-cancel="cancelBuy">
      <div class="buy-modal-content">
        <div class="modal-item">
          <span class="label">藏品名称：</span>
          <span class="value">{{ title }}</span>
        </div>
        <div class="modal-item">
          <span class="label">拥有者：</span>
          <span class="value">andor</span>
        </div>
        <div class="modal-item">
          <span class="label">描述：</span>
          <span class="value">{{ desc }}</span>
        </div>
        <div class="modal-item">
          <span class="label">哈希值：</span>
          <span class="value">{{ generateHash() }}</span>
        </div>
        <div class="modal-item">
          <span class="label">铸造时间：</span>
          <span class="value">2025-04-08</span>
        </div>
        <div class="modal-item">
          <span class="label">状态：</span>
          <span class="value status-available">可交易</span>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      editable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Title'
      },
      img: {
        type: String,
        default: require('@/assets/img/img-1.jpg')
      },
      desc: {
        type: String,
        default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
      },
      detailUrl: {
        type: String,
        default: '#'
      },
      editUrl: {
        type: String,
        default: '#'
      }
    },
    data: function () {
      return {
        showBuyModal: false
      }
    },
    methods: {
      openBuyModal() {
        this.showBuyModal = true;
      },
      handleBuy() {
        this.$emit('buy', {
          title: this.title,
          desc: this.desc,
          hash: this.generateHash()
        });
        this.showBuyModal = false;
        this.$Message.success({
          content: '交易成功！',
          duration: 3
        });
      },
      cancelBuy() {
        this.showBuyModal = false;
      },
      generateHash() {
        return '0x' + Math.random().toString(16).substr(2, 64);
      }
    }
  }
</script>

<style lang="less" scoped>
.buy-modal-content {
  .modal-item {
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
    
    .label {
      width: 80px;
      color: #666;
      font-weight: bold;
    }
    
    .value {
      flex: 1;
      color: #333;
    }
    
    .status-available {
      color: #19be6b;
    }
  }
}
</style>
