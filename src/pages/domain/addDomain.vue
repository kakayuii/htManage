<template>
  <!--新增编辑-->
  <div class="doMainView">
    <h3>{{$route.type == 'add' ? '新增' : '编辑'}}门店
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </h3>
    <el-card>
      <!--banner  门店名称-->
      <el-form ref="other" :model="other" label-width="140px">
        <el-form-item label="banner展示" prop="keyWords">
          <div class="img-list">
            <div class="img" v-for="(item,index) in showImgs" :key="item">
              <img :src="item" alt="">
              <i class="el-icon-loading" v-if="imgList.length<index+1"></i>
              <b class="big el-icon-zoom-in" @click="activeImg=item"></b>
              <div class="delete-box">
                <i class="el-icon-delete" @click="deleteImg"></i>
              </div>
            </div>
            <div class="input-box">
              <upload-img @getUploadImg="getUploadImg" @getPreview="getPreview"></upload-img>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input placeholder="请输入门店名称" v-model="displayName"></el-input>
        </el-form-item>
      </el-form>

      <!--地址 address-->
      <el-form ref="address" :model="address" label-width="140px">
        <el-form-item label="门店地址" prop="areaId" :rules="[{ required: true, message: '请选择门店地址', trigger: 'blur' }]">
          <div class="address-box">
            <el-select v-model="address.provinceId" placeholder="请选择省份" @change="getCity">
              <el-option
                v-for="item in Province" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="address.cityId" placeholder="请选择城市" @change="getArea">
              <el-option
                v-for="item in citys" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="address.areaId" placeholder="请选择区">
              <el-option
                v-for="item in areas" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>

        </el-form-item>
        <el-form-item label="详细地址" prop="street"
                      :rules="[{ required: true, message: '请输入详细地址', trigger: 'blur' }]">
          <el-input placeholder="请输入详细地址" v-model="address.street"></el-input>
        </el-form-item>
      </el-form>


      <!--domainTagRelation  模块-->
      <el-form ref="relation" :model="relation" label-width="140px">
        <el-form-item label="门店编号" prop="code"
                      :rules="[{ required: true, message: '请输入门店编号', trigger: 'blur' }]">
          <el-input placeholder="请输入门店编号" v-model="relation.code"></el-input>
        </el-form-item>
        <el-form-item label="门店类型" prop="domainType"
                      :rules="[{ required: true, message: '请选择门店类型', trigger: 'blur' }]">
          <el-select v-model="relation.domainType" placeholder="请选择门店类型">
            <el-option v-for="item in domainType" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店最大服务人数" prop="maxNumber"
                      :rules="[{ required: true, message: '门店最大服务人数', trigger: 'blur' }]">
          <el-input type="number" placeholder="门店最大服务人数" v-model="relation.maxNumber"></el-input>
        </el-form-item>
        <el-form-item type="number" label="门店面积" prop="domainArea"
                      :rules="[{ required: true, message: '请输入门店面积', trigger: 'blur' }]">
          <el-input placeholder="请输入门店面积" v-model="relation.domainArea"></el-input>
        </el-form-item>
        <el-form-item type="number" label="床位数" prop="bedNumber"
                      :rules="[{ required: true, message: '请输入床位数', trigger: 'blur' }]">
          <el-input type="number" placeholder="请输入床位数" v-model="relation.bedNumber"></el-input>
        </el-form-item>
        <el-form-item type="number" label="康复区域面积" prop="recoverArea"
                      :rules="[{ required: true, message: '请输入康复区域面积', trigger: 'blur' }]">
          <el-input type="number" placeholder="请输入康复区域面积" v-model="relation.recoverArea"></el-input>
        </el-form-item>
        <el-form-item label="促销优惠信息" prop="specialOffers"
                      :rules="[{ required: true, message: '请输促销优惠信息', trigger: 'blur' }]">
          <el-input placeholder="请输促销优惠信息" v-model="relation.specialOffers"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-switch v-model="relation.isTop" active-text="置顶" inactive-text="不置顶"></el-switch>
        </el-form-item>
        <el-form-item label="出行路线" prop="gpsPath"
                      :rules="[{ required: true, message: '请输入出行路线', trigger: 'blur' }]">
          <el-input type="textarea" placeholder="请输入出行路线" v-model="relation.gpsPath"></el-input>
        </el-form-item>
      </el-form>

      <!--标签选择-->
      <el-form ref="tagListSelect" :model="tagListSelect" label-width="140px">
        <el-form-item :label="item.tagName"
                      v-for="(item,index) in tagList"
                      v-if="item.secondId!=600&&item.secondId!=700&&item.tagName"
                      :key="index"
                      :prop="`${item.secondId}`"
                      :rules="[{ required: true, message: `请选择${item.tagName}`, trigger: 'change' }]">
          <el-checkbox-group v-model="tagListSelect[item.secondId]">
            <el-checkbox v-for="(items,i) in item.child" :key="i" :label="items.secondId" border>{{items.tagName}}
            </el-checkbox>
          </el-checkbox-group>
          <!--<el-select v-model="tagListSelect[item.secondId]" multiple :placeholder="`请选择${item.tagName}`">-->
            <!--<el-option-->
              <!--v-for="items in item.child" :key="items.secondId" :label="items.tagName" :value="items.secondId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-form-item>
      </el-form>

      <!--照护长信息-->
      <el-form ref="domainUser" :model="domainUser" label-width="140px">
        <el-form-item label="照护长姓名" prop="domainUserName"
                      :rules="[{ required: true, message: '请输入照护长姓名', trigger: 'blur' }]">
          <el-input placeholder="请输入照护长姓名" v-model="domainUser.domainUserName"></el-input>
        </el-form-item>
        <el-form-item label="照护长头像" prop="domainUserPictureId"
                      :rules="[{ required: true, message: '请上传照护长头像', trigger: 'blur' }]">
          <div class="avatar-box">
            <upload-img @getUploadImg="getAvatar" :isShow="true" :imgId="domainUser.domainUserPictureId">
            </upload-img>
          </div>
        </el-form-item>
        <el-form-item label="自我介绍" prop="myContent"
                      :rules="[{ required: true, message: '请输入自我介绍', trigger: 'blur' }]">
          <el-input type="textarea" placeholder="请输入自我介绍" v-model="domainUser.myContent"></el-input>
        </el-form-item>
      </el-form>

      <!--个人标签  服务团队-->
      <el-form ref="tagListSelect" :model="tagListSelect" label-width="140px">
        <el-form-item :label="item.tagName"
                      v-for="(item,index) in tagList"
                      v-if="item.secondId==600||item.secondId==700"
                      :key="index"
                      :prop="`${item.secondId}`"
                      :rules="[{ required: true, message: `请选择${item.tagName}`, trigger: 'change' }]">
          <el-checkbox-group v-model="tagListSelect[item.secondId]">
            <el-checkbox v-for="(items,i) in item.child" :key="i" :label="items.secondId" border>{{items.tagName}}
            </el-checkbox>
          </el-checkbox-group>
          <!--<el-select v-model="tagListSelect[item.secondId]" multiple :placeholder="`请选择${item.tagName}`">-->
            <!--<el-option-->
              <!--v-for="items in item.child" :key="items.secondId" :label="items.tagName" :value="items.secondId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-form-item>
      </el-form>

      <el-button type="primary" class="submit" @click="saveDomain">保存</el-button>
    </el-card>
    <!--放大图片-->
    <div class="show-img-box" v-if="activeImg" @click="activeImg=''">
      <img :src="activeImg" alt="">
    </div>
    <div>
      <!--<el-checkbox-group  v-for="(item,index) in 6" :key="index" v-model="aa[index]" size="mini">-->
        <!--<el-checkbox label="备选项1" border></el-checkbox>-->
        <!--<el-checkbox label="备选项2" border></el-checkbox>-->
      <!--</el-checkbox-group>-->
    </div>
  </div>
</template>
<script>
  import Api from '@/store/api'
  import uploadImg from '@/components/uploadImg'
  export default{
    components: {
      uploadImg
    },
    data(){
      return {
          aa:{
              0:[],
             1:[]
          },
        other: {},
        id: '',
        type: '',
        activeImg: '',
        showImgs: [],
        imgList: [],

        Province: [],
        citys: [],
        areas: [],

        address: {
          provinceId: '',
          cityId: '',
          areaId: '',
          street: ''
        },

        tagList: [],
        //标签选中的值
        tagListSelect: {
          100:[],
          200:[],
          300:[],
          400:[],
          500:[],
          600:[],
          700:[],
        },
        domainType: [
          {name: '长照', val: 0},
          {name: 'c型快捷站', val: 1},
          {name: 'r型快捷站', val: 2},
          {name: 'N型快捷站', val: 3},
          {name: '机构', val: 4},
        ],//门店类型

        displayName: '',
        domainUser: {   //照护长信息
          domainUserName: '',
          domainUserPictureId: '',
          myContent: ''
        },

        relation: {
          bedNumber: '',
          code: '',
          domainArea: '',
          domainType: '',
          gpsPath: '',
          isTop: 0,
          maxNumber: '',
          pictureId: '', //图片id, 多个图片id 组成的字符串
          recoverArea: '',
          specialOffers: '',
        },
      }
    },
    created(){
      let {id, type} = this.$route.query;
      this.id = id;
      this.type = type;
      this.getTagLisgt();
      this.getProvince();
      if (id) {
        this.getDomainDetails()
      }
    },
    methods: {
      async getDomainDetails(){
        let data = await Api.domain.getDomainDetails(this.id)
        //初始化数据
        let {displayName, address, domainTagRelation, domainUser} = data;
        let {areaId, street, provinceId, cityId} = address;

        let {bedNumber, code, domainArea, gpsPath, isTop, domainType, maxNumber, recoverArea, specialOffers, tagId, pictureId} = domainTagRelation;
        isTop = isTop == 1 ? true : false;
        this.displayName = displayName;
        this.address = {areaId, street, provinceId, cityId};
        this.getCity();
        this.getArea()
        this.relation = {
          bedNumber,
          code,
          domainArea,
          gpsPath,
          isTop,
          domainType,
          maxNumber,
          recoverArea,
          specialOffers,
        };
        let {domainUserName, domainUserPictureId, myContent, userTags} = domainUser;
        if (domainUser) {
          this.domainUser = {domainUserName, domainUserPictureId, myContent};
        }
        this.imgList = pictureId ? pictureId.split(',') : [];
        this.showImgs = this.imgList.map(val => this.HttpHost + '/iweb/image/' + val);
        let tags = tagId ? tagId.split(',') : [];
        tags = userTags ? tags.concat(userTags.split(',')) : tags;  //个人标签和其他标签合并
        tags = tags.map(val => val * 1)
        this.tagList.forEach(val => {
          let newArr = [];
          val.child.forEach(v => {
            if (tags.indexOf(v.secondId) != -1) {
              newArr.push(v.secondId)
            }
          })
          if (newArr.length) {
            this.tagListSelect[val.secondId] = newArr;
          }
        })
      },

      getAvatar(id){
        this.domainUser.domainUserPictureId = id;
      },
      //删除图片
      deleteImg(index){
        this.imgList.splice(index, 1);
        this.showImgs.splice(index, 1);
      },
      getUploadImg(id){
        this.imgList.push(id)
      },
      getPreview(base){
        this.showImgs.push(base)
      },
      async getProvince(){
        this.Province = await Api.domain.getProvince()
      },
      async getCity(){
        this.citys = await Api.domain.getCityById(this.address.provinceId)
      },
      async getArea(){
        this.areas = await Api.domain.getAreaById(this.address.cityId)
      },

      //获取标签列表 整理子父级关系
      async getTagLisgt(){
        let tagList = await Api.domain.TagList();
        this.tagList = tagList.filter(val => val.firstId == 0);
        this.tagList.forEach(val => {
          val.child = tagList.filter(v => v.firstId == val.secondId)
        })
      },

      //保存门店
      saveDomain(){
        let flags = [];
        let arr = ['address', 'relation', 'tagListSelect', 'domainUser'];
        arr.forEach(val => {
          this.$refs[val].validate(valid => {
            flags.push(valid)
          })
        })
        let bool = flags.every(val => val)
        if (bool) {
          let {address, domainUser, relation} = this;
          let tag = [];
          let arr = Object.values(this.tagListSelect);
          arr.forEach(v => {
            if (v.length) {
              tag = tag.concat(v);
            }
          })
          relation.isTop = relation.isTop ? 1 : 0;
          relation.tagId = tag.join(',');
          relation.pictureId = this.imgList.join(',');
          relation.id = this.id;
          let option = {
            address,
            domainUser,
            domainTagRelation: relation,
            displayName: this.displayName,
          }
          if (this.type == 'edit') {
            option.id = this.id;
          }
          Api.domain.saveDomain(option).then(res => {
            this.$message.success('保存成功');
            this.$router.go(-1)
          }).catch(res=>{
            this.$message.error(res);
          })
        }
      }

    }
  }
</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";

  .el-input, .el-select, .el-textarea {
    width: 80%;
  }

  .address-box {
    display: flex;
    flex-direction: row;
    width: 80%;
    .el-select {
      flex: 1;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .img-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
      width: 120px;
      height: 120px;
      border: 1px solid #ccc;
      margin-right: 30px;
      margin-bottom: 10px;
      position: relative;

      .big {
        position: absolute;
        top: 0;
        right: -25px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .img {
      img {
        width: 100%;
        height: 100%;
        @include middle;
      }
      b {
        position: absolute;
        top: 0;
        right: -25px;
        cursor: pointer;
        font-size: 18px;
      }
      .el-icon-loading {
        position: absolute;
        font-size: 60px;
        color: #fff;
        line-height: 120px;
        left: 30px;
      }
      &:hover {
        .delete-box {
          display: block;
        }
      }
      .delete-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: none;
        text-align: center;
        line-height: 120px;
        i {
          font-size: 60px;
          color: red;
          cursor: pointer;
        }
      }
    }
  }

  .avatar-box {
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
  }

  .show-img-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    img {
      @include middle;
      max-width: 80%;
      max-height: 90%;
    }
  }

  .submit {
    display: block;
    margin: 0 auto 50px;
    width: 260px;

  }
</style>
