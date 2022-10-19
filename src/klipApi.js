import axios from "axios";
const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";	//prepare url
const APP_NAME = "klip_poc";


//QR 생성 링크 만드는 함수
const getKlipAccessUrl = (request_key) => {
  return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;

};

/** 지갑주소 get */
export const getAddress = (setQrvalue, callback) => {
    axios
      .post(A2P_API_PREPARE_URL, {    //prepare
        bapp: {
          name: APP_NAME,
        },
        type: "auth",	//prepare 단계에서 인증 작업 요구
      }) 
      .then((response) => {   //request
        const { request_key } = response.data;	//prepare 단계의 결과로request key 받음
        setQrvalue(getKlipAccessUrl(request_key));    //QR code 생성
        let timerId = setInterval(() => {
          axios
            .get(   //result
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {  
                callback(res.data.result.klaytn_address);
                clearInterval(timerId);
                setQrvalue("DEFAULT");
              }
            });
        }, 1000);
      });
  };




/** 지갑주소get한다음 sendKlay */
  export const sendKlay = (from, setQrvalue, callback) => {
    axios
      .post(A2P_API_PREPARE_URL, {    //prepare
        bapp: {
          name: APP_NAME,
        },
        type: "send_klay",	//prepare 단계에서 인증 작업 요구
        "transaction": { "from": from, "to": "0x06A09448Ce035F05134EFCD61F66a84a2f68066b", "amount": "0.1" }
      }) 
      .then((response) => {   //request
        const { request_key } = response.data;	//prepare 단계의 결과로request key 받음
        setQrvalue(getKlipAccessUrl(request_key));    //QR code 생성
        let timerId = setInterval(() => {
          axios
            .get(   //result
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {  
                console.log(res.data.result);
                callback(res.data.result);
                clearInterval(timerId);
                setQrvalue("DEFAULT");
              }
            });
        }, 1000);
      });
  };

  /** 지갑주소get한다음 sing 기능 */
  export const sign = (currentAddress, setQrvalue, callback) => {
    axios
      .post(A2P_API_PREPARE_URL, {    //prepare
        bapp: {
          name: APP_NAME,
        },
        type: "sign_message",	//prepare 단계에서 인증 작업 요구
        message: { "value": "hi! skunk SK", "from": currentAddress },
      }) 
      .then((response) => {   //request
        const { request_key } = response.data;	//prepare 단계의 결과로request key 받음
        setQrvalue(getKlipAccessUrl(request_key));    //QR code 생성
        let timerId = setInterval(() => {
          axios
            .get(   //result
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {  
                callback(res.data.result.signature);
                clearInterval(timerId);
                setQrvalue("DEFAULT");
              }
            });
        }, 1000);
      });
  };

  /** 지갑주소get한다음 sing 기능 */
  export const mint = (currentAddress, setQrvalue, callback) => {
    axios
      .post(A2P_API_PREPARE_URL, {    //prepare
        bapp: {
          name: APP_NAME,
        },
        type: "execute_contract",	//prepare 단계에서 인증 작업 요구
        transaction: {
          "to": "0x3c04e3ed63f0f90fa2a5200d307c34f9257a9b60",
          "value": "0",
          "abi": JSON.stringify({
            "constant": false,
            "inputs": [
              {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
              }
            ],
            "name": "mintNFT",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }),
          "params": "[\"test\"]" }
      }) 
      .then((response) => {   //request
        const { request_key } = response.data;	//prepare 단계의 결과로request key 받음
        setQrvalue(getKlipAccessUrl(request_key));    //QR code 생성
        let timerId = setInterval(() => {
          axios
            .get(   //result
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {  
                console.log(res.data);
                callback(res.data.result.signature);
                clearInterval(timerId);
                setQrvalue("DEFAULT");
              }
            });
        }, 1000);
      });
  };