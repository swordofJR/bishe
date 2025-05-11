<template>
  <div class="vm-image-list">
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
        {{ title }}
      </div>
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
          <Button type="ghost" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>展示</span>
          <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
          <span class="margin-end">/ 页</span>
          <span class="total">合计 {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id">
        <VmCard :editable="true" :title="item.title" :img="item.img" :desc="item.desc" :detailUrl="item.detailUrl" @edit="handleEdit(item)"></VmCard>
      </Col>
    </Row>

    <!-- Auction Dialog -->
    <Modal v-model="showAuctionDialog" title="确认购买" @on-ok="handleAuctionConfirm">
      <div class="auction-dialog-content">
        <div class="item-info">
          <img :src="selectedItem.img" class="item-image">
          <div class="item-details">
            <h3>{{ selectedItem.title }}</h3>
            <p>{{ selectedItem.desc }}</p>
          </div>
        </div>
        <div class="auction-form">
          <Form :model="auctionForm" :label-width="100">
            <FormItem label="出价金额">
              <InputNumber v-model="auctionForm.bidAmount" :min="0.01" :step="0.1" placeholder="请输入出价金额"></InputNumber>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import VmCard from '@/components/vm-card'
  export default {
    name: 'VmImageList',
    components: {
      VmCard
    },
    props: {
      title: {
        type: String,
        default: '数字藏品交易'
      },
      // origin data
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: '19920805',
              title: 'Title',
              img: require('@/assets/img/img-1.jpg'),
              desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t',
              to: '#'
            }
          ]
        }
      }
    },
    data: function () {
      return {
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 8, // number of item per page
        currentPage: 1,
        showAuctionDialog: false,
        selectedItem: {},
        auctionForm: {
          bidAmount: 0.01
        }
      }
    },
    methods: {
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      // deleteOk: function (data) {
      //   this.$emit('delete-ok', data)
      // },
      handleEdit: function(item) {
        this.selectedItem = item
        this.showAuctionDialog = true
      },
      handleAuctionConfirm: function() {
        this.$Message.success('购买成功！')
        this.showAuctionDialog = false
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum) // update dataShow once data changed
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>

<style scoped>
.auction-dialog-content {
  padding: 20px;
}
.item-info {
  display: flex;
  margin-bottom: 20px;
}
.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
}
.item-details {
  flex: 1;
}
.item-details h3 {
  margin: 0 0 10px 0;
}
.item-details p {
  margin: 0;
  color: #666;
}
.auction-form {
  margin-top: 20px;
}
</style>
