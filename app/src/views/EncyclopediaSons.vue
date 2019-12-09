<template>
  <div class="content">
    <div class="ret-fo">
      <div class="ret">
        <i class="fa fa-angle-left" @click="backss()"></i>
        <div class="retbai">百科</div>
        <div style="width:25px;"></div>
      </div>
    </div>

    <div>
      <div class="jk">
        <p class="sf">追生二胎，别忘孕前检查</p>
        <p class="sg">备孕 备孕攻略 16457次浏览</p>
      </div>

      <ul class="lili">
        <li>
          柚子疑惑:第一胎顺利生产，宝宝健康可爱。备
          孕第二胎还需要孕前检查吗?答案是肯定的。因
          为人的身体是不断变化的，对于经产妇来说，上
          次生产的恢复情况也很重要。
        </li>
        <li>
          除了常规的孕前检查以外，二胎孕前检查还需要
          注意以下几项:
        </li>
        <li>
          <h6>1、更应注意监测血压、血糖情况</h6>
        </li>
        <li>
          随着年龄增长，血管内皮损害程度进行性加重，
          经产妇重度子痫前期、前置胎盘、胎盘早剥、胎
          膜早破和产后出血等妊娠并发症的发生率显着高
          于初产妇，可导致妊娠期高血压疾病发生率增
          加，故在妊娠前，应注意监测血压、血糖情况，
          如有异常，应及早治疗，最好待病情平稳后再进
          行妊娠。
        </li>
        <li>
          <h6>2、检查是否有盆腔炎</h6>
        </li>
        <li>
          随着年龄增长，血管内皮损害程度进行性加重，
          经产妇重度子痫前期、前置胎盘、胎盘早剥、胎
          膜早破和产后出血等妊娠并发症的发生率显着高
          于初产妇，可导致妊娠期高血压疾病发生率增
          加，故在妊娠前，应注意监测血压、血糖情况，
          如有异常，应及早治疗，最好待病情平稳后再进
          行妊娠。
        </li>
        <li>
          <h6>2、检查是否有盆腔炎</h6>
        </li>
        <li>
          此外，多数经产妇在此次妊娠前有人工流产、引
          产、上取环史，容易引发子宫内膜炎，进而导
          致前置胎盘、胎盘植入等问题，因此在计划妊娠
          前，应做相应的妇科检查及B超等辅助检查，除
          外盆腔炎性疾病。轻微的盆腔炎可以通过药物保
          守治疗，病情严重者，需进行手术治疗。
        </li>
        <li>
          <h6>3、血型检查不可忽视</h6>
        </li>
        <li>
          另外，母婴血型不合新生儿溶血病多见于经产妇
          或有流产史的女性，这是由于母婴血型不合导致
          的胎儿或新生儿免疫性溶血性疾病，临床主要分
          为ABO血型不合和Rh血型不合。所以，女性准
          备要二宝之前要注意自己的血型，女方为RH阴
          性血，或女方为O型血，男方为0型外其他血
          型，须检查血型抗体，有了基础值，才能在孕期
          定期复查，监测胎儿的生长发育是否正常。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Encyclopedia from "./Encyclopedia";
export default {
  name: "EncyclopediaSon",
  methods: {
    back() {
      this.$router.replace("/encyclopedia");
    },
    backss() {
      this.$router.replace("/encyclopediaSon");
    }
  }
  // data() {

  // }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
@import "../assets/style/Encycloped.less";

.ret-fo{
  width: 100%;
  height: 100px;
  position: relative;
}

.ret {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background: @themeColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.content {
  width: 750px;
  height: 1334px;
}

.retbai {
  color: @oneColor;
  font-size: 24px;
}
.fa {
  width: 50px;
  color: @oneColor;
  font-size: 60px;
  text-align: center;
}

.lili li h6 {
  font-size: 36px;
}
.lili li {
  margin: 100px 20px;
  font-size: 30px;
}
.sg {
  margin-top: 20px;
  font-size: 16px;
  color: @fiveColor;
}
.jk {
  margin: 20px;
}
.sf {
  text-shadow: 10px 5px 5px @themeColor;
}
</style>
