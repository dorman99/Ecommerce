new Vue({
    el: "#app",
    data: {
        
        showMenu: false,
        items:false,
        signIn:true,
        modal:'modal',
        itemquan:0,
        modalChart:'modal',
        chartData : [],
        features:{
            tagline:'ayo jajan',
            home    : 'home',
            profile : 'Profile',
            signIn  : 'Sign In',
            logout  : 'Log out',
            showcategories :'Show Categories',
            showitems:'Show Items'
        },
        dataitems:[{
            id:1,
            name:'jersey nfl',
            image: "http://nflshop.frgimages.com/FFImage/thumb.aspx?i=/productImages/_2079000/ff_2079386_xl.jpg&w=340",
            price: 20000,
            quantity:100
        },
        {   id:2,
            name:'jersey nfl',
            image: "http://nflshop.frgimages.com/FFImage/thumb.aspx?i=/productImages/_2079000/ff_2079386_xl.jpg&w=340",
            price: 20000,
            quantity:100
        },
        {   id:3,
            name:'jersey nfl',
            image: "http://nflshop.frgimages.com/FFImage/thumb.aspx?i=/productImages/_2079000/ff_2079386_xl.jpg&w=340",
            price: 20000,
            quantity:100
        },
        {   id:4,
            name:'jersey nfl',
            image: "http://nflshop.frgimages.com/FFImage/thumb.aspx?i=/productImages/_2079000/ff_2079386_xl.jpg&w=340",
            price: 20000,
            quantity:100
        }
    ],
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
            console.log(this.signIn)
            this.showMenu = !this.showMenu
            this.modal = 'modal'
            this.signIn = !this.signIn;
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
        addItemToChart(item,idx){
            this.dataitems[idx].quantity-=1
            this.chartData.push(item)
        }


    }
  }
)


// function showItems(){
//     var buttoncek =  $("#showItems").text()
//     $("#items").toggle('slow',()=>{
//       if(buttoncek == 'hide item' ){
//         $("#showItems ").text('Show Items')
//       }else if(buttoncek == 'Show Items'){
//         $("#showItems ").text('hide item')
//       }
//     })
    
//   }