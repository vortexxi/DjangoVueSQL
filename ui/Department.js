const Department = { template: `
<div>
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Department ID</th>
        <th scope="col">Department name</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody v-for="dep in departments">
        <tr>
        <td scope="row">{{ dep.DepartmentId}}</td>
        <td>{{ dep.DepartmentName}}</td>
        <td>
            <button type="button" class="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#department-modal" @click="editClick(dep)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" class="btn btn-outline-danger" @click="deleteClick(dep.DepartmentId)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        </td>
        </tr>
    </tbody>
    </table>
    
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#department-modal" v-on:click="addClick()">
    Add department
    </button>

<!-- Modal -->
    <div class="modal fade" id="department-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Department name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="DepartmentName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-if="DepartmentId == 0" v-on:click="createClick()">Create</button>
                    <button type="button" class="btn btn-primary" v-if="DepartmentId != 0" v-on:click="updateClick()">Update</button>
                </div>
            </div>
        </div>
    </div>
</div>

`,

data(){
    return{
        departments: [],
        modalTitle: '',
        DepartmentId: 0,
        DepartmentName: '',
        idLength : 0
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"department")
        .then( (response) => {
            this.departments = response.data;
            this.idLength = response.data.length+1;
            console.log(this.idLength);
        });
    },
    addClick(){
        this.modalTitle = 'Add department name';
        this.DepartmentId = 0;
        this.DepartmentName = ''
    },
    editClick(dep){
        this.modalTitle = 'Edit department name';
        this.DepartmentId = dep.DepartmentId;
        this.DepartmentName = dep.DepartmentName
    },
    createClick(){
        axios.post(variables.API_URL+"department", {
            DepartmentId : this.idLength,
            DepartmentName : this.DepartmentName
        })
        .then( (response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"department", {
            DepartmentId : this.DepartmentId,
            DepartmentName : this.DepartmentName
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
        axios.delete(variables.API_URL+'department/'+id)
        .then( (response) => {
            this.refreshData();
            alert(response.data);
        });
    }
},
mounted:function(){
    this.refreshData();
}
}
