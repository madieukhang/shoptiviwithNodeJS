
var File = require("fs")
var Cong_nghe = "json"
// MongoDB
var DbConnection = require('../Xu_ly/XL_KET_NOI_MONGODB');

function Doc_Thong_tin_Dich_vu() {
  var Duong_dan = "index.html"
  var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
  return Chuoi_Thong_tin
}

function Doc_Thong_tin_Cong_ty() {
  var Duong_dan = `${Duong_dan_Thu_muc_Du_lieu}/Cong_ty.json`
  var Chuoi_JSON = File.readFileSync(`${Duong_dan}`, "UTF-8")
  var Cong_ty = JSON.parse(Chuoi_JSON)
  return Cong_ty
}

class XL_LUU_TRU {

  Doc_Thong_tin_Dich_vu() {
    return Doc_Thong_tin_Dich_vu()
  }

  async Doc_Thong_tin_Cong_ty() {
    try {
      var db = await DbConnection.Get()
      var Cong_ty = await db.collection("Cong_ty").find({}).toArray()
      return Cong_ty
    } catch (Loi) {
      console.log(Loi)
    }
  }
  async Doc_Thong_tin_Nguoi_dung() {
    try {
      var db = await DbConnection.Get();
      var Nguoi_dung = await db.collection("Nguoi_dung").find({}).toArray()
      return Nguoi_dung
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Doc_Danh_sach(Loai_Doi_tuong) {
    try {
      var db = await DbConnection.Get()
      var Ti_vi = await db.collection("Tivi").find({}).toArray()
      return Ti_vi
    } catch (Loi) {
      console.log(Loi)
    }
  }
}




//Public để các file js khác gọi 
var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly




