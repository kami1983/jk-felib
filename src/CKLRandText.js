
/**
 * @author kami
 * @description 这个Api 用于随机测试，生成字符串用
 * */
export class CKLRandText {

    /**
     * 构造方法
     * */
    constructor () {

    }

    /**
     * 从一段文本中随机提取一个文字
     * @return String
     * */
    getCnText () {
        let sample_section = "一场秋雨协同着秋风到来风姑娘变得越来越成熟她拂过的脸颊都会变得通红你看那枝头的柿子已经忍不住要跳到了地上田间的麦穗不由得跳起欢快的舞秋天是丰收之年但同时也是植物枯萎的开端看那里有两片落叶它们随风飘舞看起来像两只想要飞舞的蝴蝶却拗不过命运最后被迫凋零晚上雪花飘然而至树叶的残兵败将和雪花展开了悄无声息的战斗第二天我去查看战果首先映入眼帘的就是满地的落叶可想而知雪占领了这棵树向上看树上挂满了积雪积雪压得树痛苦地呻吟我怕它承受不住这样的重压将手足齐断这时大街上及小巷里的雪人引起了我的注意定睛一看居然是一群老年人在堆雪人或许他们是在怀念自己逝去的童年吧夜晚微风拂过面颊那一丝丝的触动让我明白春要来了清晨出门阳光普照大地清风和煦花草树木都来凑热闹柳树也不例外她让风帮她挽发细长的发丝在风手中飘舞没过多久雨点滴到了地上啊这是春雨是春天生机的象征这一场春雨来的真是时候简直是好雨知时节当春乃发生居然来的这么准时且恰巧一声雷响将世间万物都惊醒生机勃勃的春天就要回来了我已经准备好迎接春了"
        let sample_len = sample_section.length
        let chartpoint = Math.floor(Math.random() * (sample_len -  1) );

        return sample_section.substr(chartpoint,1)
    }

    /**
     * 返回指定长度的随机文本
     * @return String
     * */
    makeCnTxt (lennum) {
        let funtxt = ""
        while (lennum - funtxt.length > 0) {
            funtxt += this.getCnText()
        }
        return funtxt
    }
}
