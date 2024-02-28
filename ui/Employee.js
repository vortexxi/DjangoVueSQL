const Employee = { template: `
<div>
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Employee ID</th>
        <th scope="col">Name</th>
        <th scope="col">Department</th>
        <th scope="col">Date of joining</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody v-for="emp in employees">
        <tr>
            <td scope="row">{{ emp.EmployeeId}}</td>
            <td>{{ emp.EmployeeName}}</td>
            <td>{{ emp.EmployeeDepartment}}</td>
            <td>{{ emp.DateOfJoining}}</td>
            <td>
                <button type="button" class="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#employee-modal" @click="editClick(emp)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" class="btn btn-outline-danger" @click="deleteClick(emp.EmployeeId)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </td>
        </tr>
    </tbody>
    </table>
    
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employee-modal" v-on:click="addClick()">
    Add employee
    </button>

<!-- Modal -->
    <div class="modal fade" id="employee-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Employee name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="EmployeeName">
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Employee department</span>
                        <select  class="form-select" aria-label="Default select example" v-model="EmployeeDepartment">
                            <option v-for="dep in departments">{{ dep.DepartmentName }}</option>
                        </select>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Employee join date</span>
                        <input type="date" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="EmployeeJoinDate">
                    </div>
                    
                    <div class="p-2 w-50 bd-highlight">
                        <img width="250" height="250"
                            :src="PhotoPath+EmployeePic" alt="some image"/>
                        <input class="m-2" type="file" @change="imgUpload">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-if="EmployeeId == 0" v-on:click="createClick()">Create</button>
                    <button type="button" class="btn btn-primary" v-if="EmployeeId != 0" v-on:click="updateClick()">Update</button>
                </div>
            </div>
        </div>
    </div>
</div>

`,

data(){
    return{
        departments: [],
        employees: [],
        modalTitle: '',
        Department: '',
        EmployeeId: 0,
        EmployeeName: '',
        EmployeeDepartment: '',
        EmployeeJoinDate:'',
        EmployeePic: 'profile.png',
        //PhotoFileName:"profile.png",
        PhotoPath: variables.PHOTO_URL, 
        idLength : 0
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"employee")
        .then( (response) => {
            this.employees = response.data;
        });
        axios.get(variables.API_URL+"department")
        .then( (response) => {
            this.departments = response.data;
            console.log(response.data)
        });
    },
    addClick(){
        this.modalTitle = 'Add employee name';
        this.EmployeeId = 0;
        this.EmployeeName = '',
        this.EmployeeDepartment = '',
        this.EmployeeJoinDate = '',
        this.EmployeePic = 'profile.png'
    },
    editClick(emp){
        this.modalTitle = 'Edit employee';
        this.EmployeeId = emp.EmployeeId;
        this.EmployeeName = emp.EmployeeName;
        this.EmployeeDepartment = emp.EmployeeDepartment;
        this.EmployeeJoinDate = emp.DateOfJoining;
        this.EmployeePic = emp.PhotoFileName
    },
    createClick(){
        axios.post(variables.API_URL+"employee", {
            EmployeeName : this.EmployeeName,
            EmployeeDepartment : this.EmployeeDepartment,
            DateOfJoining : this.EmployeeJoinDate,
            PhotoFileName : this.EmployeePic
        })
        .then( (response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"employee", {
            EmployeeId : this.EmployeeId,
            EmployeeName : this.EmployeeName,
            EmployeeDepartment : this.EmployeeDepartment,
            DateOfJoining : this.EmployeeJoinDate,
            PhotoFileName : this.EmployeePic
        })
        .then( (response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm('Are you sure?')){
            return
        }
        axios.delete(variables.API_URL+'employee/'+id)
        .then( (response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    imgUpload(event){
        //create an empty FormData object
        let formData = new FormData();
        //add a key/value pair using FormData.append()
        //append(name, value, filename), filename is optional
        formData.append('file', event.target.files[0]);
        axios.post(variables.API_URL+"employee/savefile", formData )
        .then((response) => {
            this.EmployeePic = response.data;
        })
    }
},
mounted:function(){
    this.refreshData();
}
}

