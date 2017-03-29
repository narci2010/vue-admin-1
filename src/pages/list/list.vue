<template lang="html">
  <div class="list-with-filter">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value"
                :key="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入年龄" v-model="filters.age" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入姓名" v-model="filters.userName" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <div class="filter">
          起止时间：
          <el-date-picker type="datetimerange" placeholder="选择时间范围" style="width:350px" v-model="filters.startEndTime"></el-date-picker>
        </div>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="handleCreate()">创建</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="users" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange">
        <el-table-column type="selection" width="55" :reserve-selection="reserveSelection"></el-table-column>
        <el-table-column label="姓名" prop="name" width="100"></el-table-column>
        <el-table-column label="年龄" prop="age" sortable="custom" width="100"></el-table-column>
        <el-table-column label="地址" prop="address" min-width="200"></el-table-column>
        <el-table-column label="出生日期" prop="date" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column label="修改时间" prop="modifydate" :formatter="formatDateTime" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper" v-show="!loading">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- pagination end  -->

      <!-- edit dialog start -->
      <el-dialog title="编辑" v-model="editDialog" size="tiny">
        <el-form ref="editForm" :model="editForm" label-width="80px" label-position="left">
          <el-form-item label="姓名">
            <el-input v-model="editForm.name" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="editForm.age" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="editForm.address" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker class="el-col-24" type="datetime" placeholder="选择日期时间"
              v-model="editForm.date" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSave()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- edit dialog end -->
    </div>
  </div>
</template>

<script>
import {
  fetchList,
  addUser,
  removeUser,
  editUser
} from './../../api/api';
import Formatter from '../../utils/date-formatter';

export default {
  data() {
    return {
      users: [],
      total: 0,
      pageNo: 1,
      pageSize: 20,
      loading: true,
      multipleSelection: [], // 多选
      reserveSelection: false,
      editDialog: false,
      filters: {
        sortWay: '',
        userName: '',
        startEndTime: '',
        labelVal: '1',
        age: ''
      },
      editForm: {
        id: '',
        name: '',
        address: '',
        age: '',
        date: '',
        modifydate: ''
      },
      selectedOptions: [{
        value: '1',
        label: '年龄'
      }, {
        value: '2',
        label: '姓名'
      }]
    };
  },

  methods: {
    formatDate(row) {
      return Formatter.format(row.date, 'yyyy-MM-dd');
    },
    formatDateTime(row) {
      return Formatter.format(row.modifydate, 'yyyy-MM-dd hh:mm:ss');
    },
    // 排序
    handleSortChange(sortWay) {
      console.log(sortWay);
      this.filters.sortWay = {
        prop: sortWay.prop,
        order: sortWay.order
      };
      // this.fetchData();
    },
    // 重置表单
    resetForm() {
      this.editForm.id = '';
      this.editForm.name = '';
      this.editForm.address = '';
      this.editForm.age = '';
      this.editForm.date = '';
    },
    // 新增/编辑的保存
    handleSave() {
      if (!this.editForm.id) {
        addUser(this.editForm).then(() => {
          this.fetchData();
          // 隐藏表单
          this.editDialog = false;
          this.resetForm();
          this.$message({
            message: '新增成功',
            type: 'success'
          });
        });
      } else {
        console.log(this.editForm);
        editUser(this.editForm).then(() => {
          this.fetchData();
          this.editDialog = false;
          this.resetForm();
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
        });
      }
    },
    // 打开新增
    handleCreate() {
      // 重置表单
      this.resetForm();
      // 显示dialog
      this.editDialog = true;
    },
    // 打开编辑
    handleEdit($index, row) {
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.address = row.address;
      this.editForm.age = row.age;
      this.editForm.date = row.date;
      this.editDialog = true;
    },
    // 删除
    handleDelete($index, row) {
      this.$confirm('是否删除此条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser({
          id: row.id
        }).then(() => {
          this.fetchData();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索
    handleSearch() {
      this.fetchData();
    },
    // 切换页码
    handleCurrentChange(val) {
      this.pageNo = val;
      this.fetchData();
    },
    // 切换每页显示数据条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    // 获取数据
    fetchData() {
      // param: sort way
      const sortWay = this.filters.sortWay && this.filters.sortWay.prop ? this.filters.sortWay : '';

      // param: start time and end end time
      const startTime = this.filters.startEndTime ? this.filters.startEndTime[0].getTime() : '';
      const endTime = this.filters.startEndTime ? this.filters.startEndTime[1].getTime() : '';
      console.log('this.filters.labelVal', this.filters.labelVal);
      const options = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.filters.labelVal === '2' ? this.filters.userName : null,
        startTime,
        endTime,
        sortWay,
        age: this.filters.labelVal === '1' ? parseInt(this.filters.age, 10) : null
      };
      console.log('[dashboard]:your post params');
      console.log(options);
      this.loading = true;
      fetchList(options).then((res) => {
        // clear selection
        this.$refs.table.clearSelection();
        // lazy render data
        this.users = res.data.users;
        this.total = res.data.total;
        this.loading = false;
      });
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
.list-with-filter {
  .filters {
    margin: 0 0 20px 0;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      width: auto;
      padding: 10px;
      border-radius: 5px;
      .el-select {
        display: inline-block;
      }
    }

    .el-input {
      width: 150px;
      display: inline-block;
    }
  }

  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}
</style>
