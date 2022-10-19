import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Caver from 'caver-js'
import * as KlipAPI from "./klipApi";
import {
Alert,
Container,
} from "react-bootstrap";

//QR코드와 지갑 주소를 초기화
const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";
const caver = new Caver(window.klaytn)
function App() {

const [qrvalue_auth, setQrvalue_auth] = useState(DEFAULT_QR_CODE);
const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

//지갑 연동하는 함수 실행

useEffect(()=>{
 
},[myAddress])

const getUserData = () => {
  KlipAPI.getAddress(setQrvalue_auth, async (address) => {
    setMyAddress(address);	//사용자의 지갑 주소를 가져온다
  });
};

const signMessage = () =>{
  if(myAddress === '0x00000000000000000000000000001'){
    alert('지갑 연결을 먼저 시도합니다.')
    KlipAPI.getAddress(setQrvalue_auth, async (address) => {
      setMyAddress(address);	//사용자의 지갑 주소를 가져온다
    });
  }else{
    // KlipAPI.sign(myAddress,setQrvalue_auth, (messageHash)=>{
    //   // 0x00f46556f8111dc22d7d023dea87d445541a50b69d530805f5049965798b685a7fcb6f71bb79cf354564988bf6d02e5831f3fbd4bb3a6525d785771c13cdde1a4056
    //   console.log(messageHash);
    // })
    const message = {
      message: caver.utils.hashMessage('original message'),
      address: "0x220AD25E31BBF7c19D95Be0e47d4cdc0Ad8f8FEa",
      signature: "0x1dc98165c3fc523bcdbdf18eadba12b004cd30b232e5e65fdd6424412cbf0dab2d131dda838cd249a7d00414ae53abe5ba6fa7bf8446f28c328bc60443c1545d07f5"
  }
    const data = caver.utils.recover('hi! skunk SK','0x00f46556f8111dc22d7d023dea87d445541a50b69d530805f5049965798b685a7fcb6f71bb79cf354564988bf6d02e5831f3fbd4bb3a6525d785771c13cdde1a4056')
    console.log(data);                        
  }
}

const sendKlay = ()=>{
  if(myAddress === DEFAULT_ADDRESS){
    console.log('계정연결 먼저 합시다./');
  }else{
    console.log(1);
    KlipAPI.sendKlay(myAddress,setQrvalue_auth, ()=>{})
  }
}


const mint = ()=>{
  if(myAddress === DEFAULT_ADDRESS){
    console.log('계정연결 먼저 합시다./');
  }else{
    console.log(1);
    KlipAPI.mint(myAddress,setQrvalue_auth, ()=>{})
  }
}
return (
  <div className="App">
    <header className="App-header">
    <p>{myAddress}</p>
      <button onClick={getUserData}> "지갑 연동하기"</button>
      <button onClick={signMessage}> sign</button>
      <button onClick={sendKlay}> sendKlay</button>
      <button onClick={mint}> mintNFT</button>
      {qrvalue_auth !== "DEFAULT" ? (		//klip_test.js에서 getAddress의 request_key가 제대로 설정되면 setQRvalue에 의해 DEFAULT 상태에서 벗어나게 된다
        <Container
          style={{
            backgroundColor: "white",
            width: 110,
            height: 110,
            padding: 10,
          }}
        >
          <QRCode value={qrvalue_auth} size={100} style={{ margin: "auto" }} />	
          <br />
          <br />
        </Container>
      ) : null}
   
    </header>
  </div>
);
}

export default App;