
<template>
  <div id="printTemplate" class="Result">
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
    {{resultObj}}
    {{result}}
    -->
    
    <table id="dataContent">
      
      <tr><th colspan="6">{{reportTitle}}</th></tr>
      <tr >
        <td>计算日期：</td>
        <td colspan="5">{{result.time}}</td>
 
      </tr>

      <!--
      <tr v-for="(item,index) in resultObj" :key="index" >
        <th colspan="6">{{item.itemName}}</th>
      </tr>
      
      resultObj.item[0].itemName <tr><th colspan="6">{{item.itemName}}</th></tr>
      <tr>
      resultObj.item[0].subitem[0].name  resultObj.item[0].subitem[1].name
      </tr>
      <tr>
      resultObj.item[0].subitem[2].name  resultObj.item[0].subitem[3].name
      </tr>

      resultObj.item[1].itemName <tr><th colspan="6">{{item.itemName}}</th></tr>
      <tr>
      resultObj.item[1].subitem[0].name  resultObj.item[1].subitem[1].name
      </tr>
      <tr>
      resultObj.item[1].subitem[2].name  resultObj.item[1].subitem[3].name
      </tr>

      -->
<!--   
      <tr v-for="i in (resultObj.length %2)+1 " :key="i" >
        <td >{{resultObj[(i)].itemName}}</td>
      </tr>

      <td v-if="i+1 == resultObj.length" >{{resultObj[(i+1) ].itemName}}</td>

      <tr v-for="(item,index) in resultObj" :key="index" >
        <td >{{item.itemName}}</td>
      </tr>

      <tr v-for="i in (resultObj.length / 2)">
        <td >{{resultObj[(i - 1) * 2].itemName}}</td>

        <td >{{resultObj[(i - 1) * 2 + 1].itemName}}</td>
      </tr>
-->
    </table>
    <div> </div>

    <!--
    person.student[0...n].name
    v-for="item in result"
    <div v-if="person.length > 0">
    <tr  v-for="p in person" >
					<td >{{ p.name }}</td>
          <div v-if="p.student > 0">
          </div>
					<td :class="'text-center'"><button @click="deletePerson($index)">Delete</button></td>
    </tr>
    </div>
    -->
    
    <div style="padding:15px;">
      <flexbox>
        <flexbox-item>
          <x-button  type="primary" @click.native="fnPrintResult">打印</x-button>
        </flexbox-item>
      </flexbox>
    </div>

  </div>
  
</template>


<script>

//console.log(' loading commonPreview ');
import { mapGetters } from "vuex";
import { Flexbox, FlexboxItem,XButton } from "vux";
export default {
  name: "commonPreview",
  components: {
    Flexbox,
    FlexboxItem,
    XButton
  },
  computed: {
    ...mapGetters(["calcRes","reportTitle"])
    //...mapGetters('rwOptions', ['cognitoAuthEnabled']),
  },
  data() {
    return {
      resultObj: this.$store.state.calculate.calcRes,
      //resultObj: commonUtils.getTestResult().resultData.rd,
      vueClass: "data-v-0fc70838",
      //reportTitle: this.$store.state.calculate.reportTitle,
      result: commonUtils.getTestResult()
    };
  },
  created() {
    console.log("created");

  },
  mounted() {
    this.fnLoadData(this);
  },
  methods: {
    fnLoadData(self) {
      let datas = this.resultObj;
      let domTable = jquery("#dataContent");
      for (let i=0; i <datas.length;i++){
        let htmlTitle = this.fnConcatenateTitle(datas[i]);  
        domTable.append(htmlTitle);
        for(let j=0; j<=datas[i].subitem.length;j=j+2){
          let htmlBox = " <tr class='placeHolderforTest' >" ;
          htmlBox += this.fnConcatenateBox(datas[i].subitem[j]);
          htmlBox += this.fnConcatenateBox(datas[i].subitem[j+1]);
          htmlBox += " </tr>";
          let r = htmlBox.replace(/class=/g, ""+this.vueClass+" class=");
          domTable.append(r);
        }
      }
    },
    fnConcatenateBox(data){
      if (data == undefined) return "<td class='placeHolderforTest'></td><td class='placeHolderforTest'></td><td class='placeHolderforTest'></td>";
      let htmlBox = " "
                  + " <td class='placeHolderforTest'> " + data["name"] +  "</td>"
                  + " <td class='placeHolderforTest'> " + data["value"] + "</td>"
                  + " <td class='placeHolderforTest'> " + data["unit"] +  "</td>";
      return htmlBox;
    },
    fnConcatenateTitle(data){
      let htmlTitle = " <tr class='placeHolderforTest' ><th class='placeHolderforTest' colspan='6'>" +data["itemName"]+ "</th></tr>";
      //console.log("htmlTitle = "+ htmlTitle);
      let r = htmlTitle.replace(/class=/g, ""+this.vueClass+" class=");
      return r;
    },
    fnPrintResult(){
      //https://www.npmjs.com/package/vue-html-to-paper
      console.log("fnPrintResult");
      this.$htmlToPaper('printTemplate');
    },
  } 
};

</script>
<style scoped lang="less">
@import '../../styles/vuetable.less';

</style>