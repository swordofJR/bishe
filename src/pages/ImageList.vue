<template>
  <VmImageList :data="dataImageList" class="vm-margin"></VmImageList>
</template>

<script>
  import VmImageList from '@/components/vm-image-list'
  export default {
    name: '数字藏品交易',
    components: {
      VmImageList
    },
    // methods: {
    //   deletefn: function (data) {
    //     for (let i = 0; i < this.dataImageList.length; i++) {
    //       if (this.dataImageList[i].id === data.id) {
    //         this.dataImageList.splice(i, 1)
    //       }
    //     }
    //   }
    // },
    data: function () {
      return {
        dataImageList: [
          {
            id: '201707101552',
            title: '数字藏品1',
            img: require('@/assets/img/img-1.jpg'),
            desc: '这款数字油画藏品，以细腻笔触勾勒梦幻花园。繁花似锦，蝴蝶翩跹，色彩搭配绝妙，将浪漫氛围凝于方寸之间，极具收藏价值。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101553',
            title: '数字藏品2',
            img: require('@/assets/img/img-2.jpg'),
            desc: '以古老神话为蓝本创作的数字雕塑藏品，立体呈现神话人物英姿。线条流畅，细节精致，赋予古老故事全新视觉演绎，是不可多得的佳作。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101554',
            title: '数字藏品3',
            img: require('@/assets/img/img-3.jpg'),
            desc: '这组数字摄影藏品，抓拍自然奇景瞬间。或日出云海，或星空璀璨，每一张都定格永恒之美，让自然震撼时刻伴你左右。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101555',
            title: '数字藏品4',
            img: require('@/assets/img/img-4.jpg'),
            desc: '融合现代科技与传统剪纸艺术的数字藏品，用创新手法呈现剪纸灵动。图案精美，光影效果独特，传统艺术焕发新活力。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101556',
            title: '数字藏品5',
            img: require('@/assets/img/img-5.jpg'),
            desc: '以知名动漫角色为原型打造的数字手办藏品，高度还原角色神态。动作设计俏皮，色彩明艳，动漫迷不容错过的珍藏好物。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101557',
            title: '数字藏品6',
            img: require('@/assets/img/img-6.jpg'),
            desc: '数字藏品呈现的古老书法名作，笔触行云流水，墨韵悠长。透过屏幕，仿若能感受古人挥毫泼墨时的豪情，文化底蕴深厚。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101558',
            title: '数字藏品7',
            img: require('@/assets/img/img-7.jpg'),
            desc: '这一系列数字建筑模型藏品，精准复刻世界著名建筑。从埃菲尔铁塔到故宫，细节入微，带你领略建筑艺术的辉煌。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101559',
            title: '数字藏品8',
            img: require('@/assets/img/img-8.jpg'),
            desc: '以珍稀动物为主题的数字插画藏品，生动展现动物憨态。色彩柔和，画风治愈，为热爱动物的你留存美好。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015510',
            title: '数字藏品9',
            img: require('@/assets/img/img-1.jpg'),
            desc: '数字藏品中的古典乐器，3D 建模还原精致构造。纹理清晰，仿若能听见其奏响的悠扬旋律，尽显传统音乐魅力。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015511',
            title: '数字藏品10',
            img: require('@/assets/img/img-2.jpg'),
            desc: '以未来科幻为灵感的数字艺术藏品，构建奇妙宇宙场景。飞船穿梭，星球闪耀，满足你对未来世界的无限遐想。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '2017071015512',
            title: '数字藏品11',
            img: require('@/assets/img/img-3.jpg'),
            desc: '这张数字海报藏品，设计风格复古。图案元素巧妙融合，散发浓郁怀旧气息，带你重回特定的激情岁月。',
            detailUrl: '#',
            editUrl: '#'
          },
          {
            id: '201707101513',
            title: '数字藏品12',
            img: require('@/assets/img/img-4.jpg'),
            desc: '基于民间传说创作的数字故事书藏品，图文并茂。画面精美，情节引人入胜，传承古老文化的独特载体。',
            detailUrl: '#',
            editUrl: '#'
          }
        ]
      }
    }
  }
</script>
