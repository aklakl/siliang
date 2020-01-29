
<template>
  <div class="Result">
    <!-- demo -->
    <!--
    <table id="dataContent">
			<thead>
				<tr>
					<th colspan="6">Tile1</th>
				</tr>
			</thead>
			<tbody>
				<tr >
					<td>test1</td>
					<td>test2</td>
					<td>test3</td>
					<td>test4</td>
          <td>test5</td>
          <td>test6</td>
				</tr>
        <tr>
					<th colspan="6">Tile2</th>
				</tr>
			</tbody>
		</table>
    -->
    <table id="dataContent">
      <tr><th colspan="6">Tile1</th></tr>
      <tr >
        <td>test1</td>
        <td>test2</td>
        <td>test3</td>
        <td>test4</td>
        <td>test5</td>
        <td>test6</td>
      </tr>
      <tr >
        <th colspan="6">Tile2</th>
      </tr>
    </table>
    <div> </div>
    <!--
person.student[0...n].name
    v-for="person in people"
    <div v-if="person.length > 0">
    <tr  v-for="p in person" >
					<td >{{ p.name }}</td>
          
          <div v-if="p.student > 0">
          </div>
					<td :class="'text-center'"><button @click="deletePerson($index)">Delete</button></td>
    </tr>
    </div>
    -->
  </div>
</template>


<script>

console.log(' loading commonPreview ');
export default {
  name: "commonPreview",
  created() {
    
  },
};

</script>
<style scoped lang="less">
@import '../../styles/vuetable.less';

</style>