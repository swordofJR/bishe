<template>
  <VmTable title="修改我的版权信息" 
           type="edit" 
           :columns="dataColumns" 
           :data="dataTable"
           v-on:add-ok="add"
           v-on:edit-ok="edit"
           v-on:delete-ok="deletefn"
           class="vm-margin">
  </VmTable>
</template>

<script>
  import VmTable from '@/components/vm-table'
  export default {
    name: 'EditableTable',
    components: {
      VmTable
    },
    methods: {
      add: function (data) {
        this.dataTable.unshift(data)
      },
      edit: function (data) {
        this.dataTable.forEach(function (elem) {
          if (elem.id === data.id) {
            for (let i in data) {
              elem[i] = data[i]
            }
          }
        })
      },
      deletefn: function (data) {
        for (let i = 0; i < this.dataTable.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (this.dataTable[i].id === data[j].id) {
              this.dataTable.splice(i, 1)
            }
          }
        }
      }
    },
    data () {
      return {
        dataColumns: [
          {
            id: '20156541',
            title: 'id',
            key: 'id'
          },
          {
            id: '20156542',
            title: '版权名称',
            key: 'name'
          },
          {
            id: '20156543',
            title: '版权状态',
            key: 'age'
          },
          {
            id: '20156544',
            title: '版权描述',
            key: 'address'
          }
        ],
        dataTable: [
          {
            id: '0',
            name: '版权1',
            age: '审核中',
            address: '版权1'
          },
          {
            id: '1',
            name: '版权2',
            age: '审核中',
            address: '版权2'
          },
          {
            id: '2',
            name: '版权3',
            age: '通过审核',
            address: '版权3'
          },
          {
            id: '3',
            name: '版权4',
            age: '通过审核',
            address: '版权4'
          },
          {
            id: '4',
            name: '版权5',
            age: '通过审核',
            address: '版权5'
          },
          {
            id: '5',
            name: '版权6',
            age: '通过审核',
            address: '版权6'
          },
          {
            id: '6',
            name: '版权7',
            age: '通过审核',
            address: '版权7'
          },
          {
            id: '7',
            name: '版权8',
            age: '通过审核',
            address: '版权8'
          },
          {
            id: '8',
            name: '版权9',
            age: '通过审核',
            address: '版权9'
          },
          {
            id: '9',
            name: '版权10',
            age: '通过审核',
            address: '版权10'
          },
          {
            id: '10',
            name: '版权11',
            age: '通过审核',
            address: '版权11'
          },
          {
            id: '11',
            name: '版权12',
            age: '通过审核',
            address: '版权12'
          }
        ]
      }
    }
  }
</script>
