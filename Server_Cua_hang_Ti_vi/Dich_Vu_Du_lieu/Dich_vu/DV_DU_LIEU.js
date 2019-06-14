
var NodeJs_Dich_vu = require("http")
var Luu_tru = require("../Xu_ly/XL_LUU_TRU")
//var Goi_thu = require("../Xu_ly/XL_GOI_THU_DIEN_TU")
var Port = normalizePort(process.env.PORT || 1000);
//var Port = http://du-dv-du-lieu.herokuapp.com/
var Xu_ly_Tham_so = require('querystring')

var Du_lieu = {}
var Danh_sach_Ti_vi = Luu_tru.Doc_Danh_sach("Ti_vi")
var Cong_ty = Luu_tru.Doc_Thong_tin_Cong_ty()

Danh_sach_Ti_vi.then(Kq => {
  Du_lieu.Danh_sach_Ti_vi = Kq
})
Cong_ty.then(Kq => {
  Du_lieu.Cong_ty = Kq[0]
})

var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = ""
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
  Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
  Yeu_cau.on('end', () => {

    var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
    var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
    var Chuoi_Kq = ""

    if (Ma_so_Xu_ly == "Doc_Danh_sach_Ti_vi") {
      var Doi_tuong_Kq = {}
      Doi_tuong_Kq.Danh_sach_Ti_vi = Du_lieu.Danh_sach_Ti_vi
      Doi_tuong_Kq.Cong_ty = Du_lieu.Cong_ty

      Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
      Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
      Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
      Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
      Dap_ung.end(Chuoi_Kq);
    } else if (Ma_so_Xu_ly == "Ghi_Phieu_Dat_hang") {
      var Kq = ""
      var Ti_vi = Du_lieu.Danh_sach_Ti_vi.find(x => x.Ma_so == Tham_so.Ma_so_Ti_vi)
      var Phieu_Dat_hang = JSON.parse(Chuoi_Nhan)
      var So_Phieu_Dat = Ti_vi.Danh_sach_Phieu_Dat.length + 1
      Phieu_Dat_hang.So_Phieu_Dat = So_Phieu_Dat
      Ti_vi.Danh_sach_Phieu_Dat.push(Phieu_Dat_hang)
      var Dieu_kien = { "Ma_so": Ti_vi.Ma_so }
      var Gia_tri_Cap_nhat = {
        $set: { Danh_sach_Phieu_Dat: Ti_vi.Danh_sach_Phieu_Dat }
      }
      Kq = Luu_tru.Cap_nhat_Doi_tuong("Tivi", Dieu_kien, Gia_tri_Cap_nhat)

      Kq.then(result => {
        console.log(result)
        Chuoi_Kq = "OK"
      })
    } else if (Ma_so_Xu_ly == "Khach_hang_Lien_he") {
      var ho_ten = Th_Ho_ten.value
      var email = Th_Email.value
      var tieu_de = Th_Tieu_de.value
      var noi_dung = CKEDITOR.instances.Th_Noi_dung.getData();
      var Kq = Goi_thu.Goi_Thu_Lien_he(ho_ten, email, tieu_de, noi_dung)
      console.log(Kq)
      Kq.then(result => {
        console.log(result)
        Chuoi_Kq = "OK"
        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
        Dap_ung.end(Chuoi_Kq);
      }).catch(err => {
        console.log(err)
        Chuoi_Kq = err
        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
        Dap_ung.end(Chuoi_Kq);
      })
    } else {

      Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
      Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
      Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
      Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
      Dap_ung.end(Chuoi_Kq);
    }
    // Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    // Dap_ung.end(Chuoi_Kq);
  })
})

Dich_vu.listen(Port,
  console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
);
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof Port === 'string'
    ? 'Pipe ' + Port
    : 'Port ' + Port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = Dich_vu.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}