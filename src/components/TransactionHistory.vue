<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
  <div class="q-pt-md">
    <q-markup-table flat bordered style="max-height: 400px">
      <thead class="bg-teal">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">

              <q-icon size="xl" name="account_balance" style="width: 70px" color="grey-3" />

              <div class="text-h6 q-ml-md text-white">Transaction history</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Transaction Description</th>
          <th class="text-left">Transaction Type</th>
          <th class="text-right">Amount</th>
          <th class="text-right">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            v-for="(transaction, i) in transactions" :key="i"
            :class="transaction.name === 'withdrawal' ? withdrawal : deposit "
        >
          <td class="text-left">{{ transaction.description}}</td>
          <td class="text-left">{{transaction.name}}</td>
          <td class="text-right">{{ transaction.amount }}</td>
          <td class="text-right">{{ transaction.date | filterDate}} {{ transaction.date | filterTime}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  </transition>
</template>


<script>
export default {
    props: {
        transactions: {
            type: Array
        }
    },
    data() {
        return {
            withdrawal: 'bg-red-3',
            deposit: 'bg-green-3'
        }
    },
    filters: {
      filterDate(value) {
        let date = new Date(value).getDate()
        let month = new Date(value).getMonth() + 1
        let year = new Date(value).getFullYear()
        // let date = value.getDate()
        return `${year}/${month}/${date}`
      },
      filterTime(value) {
        let hours = new Date(value).getHours()
        let minutes = new Date(value).getMinutes()
        return `${hours}:${minutes}`
      }
    }

}
</script>

<style>

</style>
