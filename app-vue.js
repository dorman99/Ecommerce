new Vue({
    el: "#app",
    data: {
        
        showMenu: false,
        password:'',
        loggedin :{
            admin:false,
            customer:false
        },
        selected:{
            itemRemove:'',
            userRemove:'',
            userRole  :'',
            itemQuantity:''
        },
        itemQuantity:'',
        email:'',
        items:false,
        signIn:true,
        modal:'modal',
        showMenuAdmin:false,
        modalChart:'modal',
        logoutbtn:false,
        userRole:'',
        chartData : [],
        datausers  : [],
        newUser   :{
            name:'',
            email:'',
            role :'',
            password:''
        },
        newItem   :{
            name:"",
            quantity:"",
            category:"",
            price   :"",
            category:""
        },
        features:{
            tagline:'ayo jajan',
            home    : 'home',
            profile : 'Profile',
            signIn  : 'Sign In',
            logout  : 'Log out',
            showcategories :'Show Categories',
            showitems:'Show Items'
        },
        dataitems:[],
        categories:[
            'sport',
            'education',
            'IT'
        ],
        transactions:[
            'History buy',
            'checkout items'
        ],
        makan:'bahlul ente',
    },
    methods:{
        login () {
            console.log(this,'ini this atas')
            let self = this

            axios.post('http://localhost:3000/signin',{
                email:this.email,
                password:this.password
            })
            .then(function(response){
                self.dataitems = response.data.dataItems
                self.datausers = response.data.dataUsers
                console.log(response,'ini response')
                if (response.data.length !== 0) {
                 if(response.data.data.role == 'customer'){
                    
                        self.modal = "modal"
                        self.showMenu = !self.showMenu
                        self.signIn = !self.signIn;
                        self.logoutbtn = !self.logoutbtn
                        self.loggedin.customer = true
                        
                    }
                 else if(response.data.data.role == 'admin'){
                    
                        self.modal = "modal"
                        self.showMenuAdmin = !self.showMenuAdmin
                        self.logoutbtn = !self.logoutbtn
                        self.signIn = !self.signIn;
                        self.loggedin.admin = true
                    
                }}
                else if (response.data.length == 0) {
                    self.email = '',
                    self.password = ''
                    window.alert('password/email salah')
                }
               
    
           
            })
            .catch(function(error){
            
                console.error(error)
            })
            
        },logout(){
            console.log('masuk logout')
            if(this.loggedin.admin){
                this.email = '',
                this.password = ''
                this.showMenuAdmin = !this.showMenuAdmin
                this.logoutbtn = !this.logoutbtn
                this.signIn = !this.signIn
                this.loggedin.admin = false
            }else{
                this.email = '',
                this.password = ''
                this.showMenu = !this.showMenu
                this.signIn = !this.signIn
                this.logoutbtn = !this.logoutbtn
                this.loggedin.customer = false
            }
        },
        closeModalChart(){
            this.modalChart = 'modal'
        },
        closeModalSignIn(){
            this.modal = 'modal'
        },
        modalPopUp () {
            this.modal+=' is-active'
        },
        showMychart(){
           
            this.modalChart+=' is-active'
        },
        showItems(){
           this.items = !this.items
        },
        addItemToChart(item){
            console.log('masuk ke sini')
            let avail =  false
            let index = 0
            if(item.quantity !== 0 ){
                this.chartData.forEach((row,idx)=>{
                    if(row._id == item._id){
                        avail =  true
                        index = idx
                    }
                })
                console.log('aaa',avail)
                console.log('aaaaa',index)
                if(avail === true){
                    this.chartData[index].quantity++
                    this.chartData[index].subtotal+=item.price
                    item.quantity--
                }else{
                    let objCart = {
                        ...item,
                        quantity : 1,
                        subtotal: item.price
                    }
                    item.quantity--
                    this.chartData.push(objCart)
                }
            }
           
        },
        removeItem(item){
           
            this.dataitems.filter((el,idx)=>{
                if(el._id == item._id){
                    return this.dataitems[idx].quantity+=item.quantity
                }
            })
           this.chartData.filter((row,index)=>{
               if(row._id == item._id){
                   return this.chartData.splice(index, 1)
               }
           })
            
        },
        inputNewItemAdmin(){
            let self = this
            axios.post('http://localhost:3000/items',{
                name:self.newItem.name,
                quantity:self.newItem.quantity,
                price:self.newItem.price,
                category:self.newItem.category

            }).then(function(response){
                console.log(response)
                self.dataitems.push(response.data.data)
                window.alert('item has been added to DB')
                self.newItem = {}
            })
            .catch(function(err){
                console.log(err)
            })
        }, 
        removeItemAdmin(){
            let self =  this
            axios.delete(`http://localhost:3000/items/${self.selected.itemRemove}`)
             .then(response=>{
                 
                self.dataitems.forEach((el,idx)=>{
                    if(el._id == self.selected.itemRemove){
                        self.dataitems.splice(idx,1)
                    }
                })
                self.selected.itemRemove = ''
                 window.alert('item has been deleted')
             }).catch(error=>{
                 console.error(error)
             })
        },
        inputNewUserAdmin(){
            let self = this
            axios.post('http://localhost:3000/users',{
                name:self.newUser.name,
                email:self.newUser.email,
                password:self.newUser.password,
                role:self.newUser.role
            })
            .then(function(response){
                self.newUser = {}
                self.datausers.push(response.data.data)
                window.alert('user has been created')
            })
            .catch(err=>{console.log(err)})
        },
        removeUserAdmin(){
            console.log('masuk sini')
            let self =  this
            axios.delete(`http://localhost:3000/users/${self.selected.userRemove}`)
             .then(response=>{
                 self.datausers.filter((el,idx)=>{
                     if(el._id == self.selected.userRemove){
                         self.datausers.splice(idx,1)
                     }
                 })
                 self.selected.userRemove = ''
                 window.alert('user has been deleted')
             })
             .catch(err=>{console.log(err)})
        }, changeRoleAdmin(){
            let self = this
            axios.put(`http://localhost:3000/users/${self.selected.userRole}`,{
                role:self.userRole
            }).then(function(response){
                window.alert('role has been changed to '+ self.userRole)
                self.userRole = ""
                self.selected.userRole=''
            })
        }, changeQuantityAdmin(){
            let self = this
            axios.put(`http://localhost:3000/items/${self.selected.itemQuantity}`,
            {
                quantity:self.itemQuantity
            }).then(response=>{
                self.itemQuantity = ''
                self.selected.itemQuantity=''
                window.alert('item quantity has been updated')
            })
            .catch(err=>{
                console.log(err)
            })
        }

    },
    computed:{
        totalPrice:function(){
            const totalHarga = this.chartData.reduce((accu, currentVal)=>{
                console.log('accu ', accu)
                console.log('value',currentVal.price)
                return accu + currentVal.subtotal
            }, 0)
            return totalHarga
        }
    }
  }
)

/**
 * reduce ketika barang tidak jadi di tampung di hapus
 * main tain yang lain juga 
 * 
 * jumat pagi di lanjutkan
 * \
 */