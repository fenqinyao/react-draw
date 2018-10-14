import React, { PureComponent } from "react"
import styled from 'styled-components'

import { getGift } from './DrawData'

// common
const bgBorderColor = "#0066FF"
const bgColor = "#CCEEFF"
const grayColor = "#999999"
const activeColor = "#FFA488"
const btnBg = "#33CCFF"
const btnClickBg = "#BEBEBE"
const ClearFix = styled.div`
    &:before,&:after{
        display:table;
        content:'';
        clear:both;
    }
`;
const GrawTitle = styled.div`
    font-size:18px;
    color:${activeColor};
    text-align:center;
    font-weight:700;
    line-height:80px;
`;
const DrawWrap = styled.div`
    width:640px;
    margin:0 auto;
`;
const DrawBg = styled(ClearFix)`
    position:relative;
    width:596px;
    height:504px;
    padding:24px;
    margin:0 auto;
    border-radius:5px;
    border:1px solid ${bgBorderColor};
    background-color:${bgColor};
`;
const GiftBox = styled(ClearFix)`
    width:546px;
    height:454px;
    position:relative;
`;
const GiftItem = styled.div`
    width:86px;
    height:86px;
    position:absolute;
    left:${props => props.left};
    top:${props => props.top};
    z-index:10;
    display:inline-block;
    box-sizing:border-box;
    padding-top:10px;
    border-radius:5px;
    border:2px solid;
    border-color:${props => props.active ? activeColor : grayColor};

    .gift-name{
        text-align:center;
        font-size:14px;
        color:${props => props.active ? activeColor : grayColor};
    }
`;

const GiftImg = styled.div`
    width:48px;
    height:48px;
    margin:0 auto;
    background-image:url(${props => props.iconSrc});
`;

const DrawBtn = styled.button`
    outline:none;
    border:0;
    width:362px;
    height:270px;
    position:absolute;
    left:92px;
    top:92px;
    z-index:10;
    background-color:${props => props.isClicking ? btnClickBg : btnBg};
    border-radius:5px;
    cursor:pointer;
    padding:0;

    font-size:45px;
`;

function GetDrawBtn({ isClicking, onClick }) {
    return <DrawBtn isClicking={isClicking} onClick={onClick}>{isClicking ? "抽奖中" : "开始"}</DrawBtn>
}
class Draw extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            giftList: getGift(),
            // 开始位置
            startIndex: 0,
            // 停止位置
            endIndex: 1,
            // 抽奖是否正在进行中
            isDrawing: 0,
            // 剩余抽奖次数
            myCount: 5,
        }
        console.log(this.state)
    }
    componentDidMount() {
        console.log(`mouted`)
    }
    startDraw = e => {
        this.setState({ isDrawing: 1 })
        console.log(this.state)
    }
    render() {
        const { giftList, endIndex, isDrawing, myCount } = this.state
        const getIsActive = (item) => (
            item.id === endIndex ? 1 : 0
        )
        return (
            <div className="draw-box">
                <DrawWrap>
                    <GrawTitle>抽奖次数：{myCount}</GrawTitle>
                    <DrawBg>
                        <GiftBox>
                            {
                                giftList.map((gift, index) =>
                                    <GiftItem active={getIsActive(gift)}
                                        iconSrc={gift.icon}
                                        left={gift.left}
                                        top={gift.top}
                                        key={index}>
                                        <GiftImg iconSrc={gift.icon}></GiftImg>
                                        <div className="gift-name">{gift.name}X{gift.count}</div>
                                    </GiftItem>
                                )
                            }
                            <GetDrawBtn isClicking={isDrawing} onClick={this.startDraw} />
                        </GiftBox>
                    </DrawBg>
                </DrawWrap>
            </div>
        )
    }
}

export default Draw