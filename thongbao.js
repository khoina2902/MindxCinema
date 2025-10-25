function hienThiThongBao(noiDung){
    let thongBao = document.getElementById('thongbao');
    thongBao.innerHTML = noiDung;
}

function dangKy(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword  = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword){
        hienThiThongBao('Vui long dien day du thong tin!');
        return;
    }

    if (password !== confirmPassword){
        hienThiThongBao('Mat khau khong khop!');
        return;

    }
    let users = JSON.parse(localStorage.getItem('Users')|| '[]');

    let daTonTai = false;
    for (let i = 0; i < username.length; i++){
        if(users[i].username == username){
            daTonTai = true;
            break;
        }
    }

    if (daTonTai){
        hienThiThongBao('Ten Dang nhap da ton tai!');
        return;
    }

    users.push(username, password);
    localStorage.setItem('users',JSON.stringify(users));

    hienThiThongBao('Dang ky thanh cong!');
}
