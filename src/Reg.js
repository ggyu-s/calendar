var regEmail = /^[\w]([./_-]?[\w])*@[\w]([./_-]?[\w])*\.[A-Za-z]{2,3}/gi; // 이메일

var regPhone = /01[0|1|]-?\d{3,4}-?\d{3,4}/gi; // 휴대폰번호 하이픈을 넣거나 없이 입력가능

var regName = /[가-힣]/gi; // 한글만 입력가능

var regAddress = /^.[^@#!~$%\^&*[\]{}';":]{1,20}/gi; // 특수문자제외

var regPassword = /^(?=.*\w)[a-zA-Z0-9]{8,10}/gi; // 패스워드
