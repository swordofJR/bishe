<template>
  <div class="basic-table vm-margin">
    <VmTable title="我的数字藏品版权" :columns="dataColumns" :data="dataTable"></VmTable>
  </div>
</template>

<script>
  import VmTable from '@/components/vm-table'
  import AuctionABI from '../../build/contracts/DigitalCopyright.json'
  import { ethers } from 'ethers'

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
            title: 'id',
            key: 'id',
            sortable: true
          },
          {
            id: '2.140711',
            title: '藏品名',
            key: 'name',
            sortable: true
          },
          {
            id: '2.140712',
            title: '藏品状态',
            key: 'age',
            sortable: true
          },
          {
            id: '2.140713',
            title: '卖家备注',
            key: 'address',
            sortable: true
          }
        ],
        dataTable: [
          {
            id: '0',
            name: '藏品1',
            age: '待交易',
            address: '藏品1'
          },
          {
            id: '1',
            name: '藏品2',
            age: '待交易',
            address: '藏品2'
          },
          {
            id: '2',
            name: '藏品3',
            age: '待交易',
            address: '藏品3'
          },
          {
            id: '3',
            name: '藏品4',
            age: '待交易',
            address: '藏品4'
          },
          {
            id: '4',
            name: '藏品5',
            age: '待交易',
            address: '藏品5'
          },
          {
            id: '5',
            name: '藏品6',
            age: '待交易',
            address: '藏品6'
          },
          {
            id: '6',
            name: '藏品7',
            age: '待交易',
            address: '藏品7'
          },
          {
            id: '7',
            name: '藏品8',
            age: '待交易',
            address: '藏品8'
          },
          {
            id: '8',
            name: '藏品9',
            age: '待交易',
            address: '藏品9'
          },
          {
            id: '9',
            name: '藏品10',
            age: '待交易',
            address: '藏品10'
          },
          {
            id: '10',
            name: '藏品11',
            age: '待交易',
            address: '藏品11'
          },
          {
            id: '11',
            name: '藏品12',
            age: '待交易',
            address: '藏品12'
          }
        ]
      }
    },
    mounted() {
      this.loadItems()
    },
    methods: {
      async loadItems() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
          process.env.VUE_APP_CONTRACT_ADDRESS,
          AuctionABI.abi,
          provider
        )
        const count = await contract.getItemaCount()
        const items = []
        for (let i = 0; i < count; i++) {
          const item = await contract.getItem(i)
          items.push({
            id: item[0],
            title: item[1],
            desc: item[2],
            imgHash: item[3]
          })
        }
        this.dataTable = items
      }
    }
  }
</script>
