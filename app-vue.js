new Vue({
    el: "#app",
    data: {
        
        showMenu: false,
        items:false,
        signIn:true,
        modal:'modal',
        total:0,
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
            quantity:10
        },
        {   id:2,
            name:'jersey nfl',
            image: "http://www.profootballhof.com/assets/1/26/DimRegular/A-Rodgers-Kids-Jersey-fb2.jpg?18721",
            price: 20000,
            quantity:100
        },
        {   id:3,
            name:'jersey nfl',
            image: "http://nflshop.frgimages.com/FFImage/thumb.aspx?i=/productImages/_3038000/ff_3038852_full.jpg&w=340",
            price: 20000,
            quantity:100
        },
        {   id:4,
            name:'jersey nfl',
            image: "data:image/jpeg;base64,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",
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
            let count = 0
            if(this.dataitems[idx].quantity !== 0){
                this.chartData.map(el=>{
                    if(el.id == item.id){
                        count = 1
                    }
                })
                    console.log(count,'---')
                    if(count == 0){
                        console.log(item)
                        let objAddTochart ={
                            id: item.id,
                            image:item.image,
                            name:item.name,
                            price:item.price,
                            quantity:1
                        }
                        console.log(this.dataitems[idx].quantity,'data before')
                    
                        console.log(this.dataitems[idx].quantity,'===')
                        this.dataitems[idx].quantity-=1
                        // console.log(item,'ini item')
                        this.chartData.push(objAddTochart)
                    }else{
                        this.chartData[idx].quantity++
                        this.dataitems[idx].quantity--
                    }
            }
           
        }

    },
    computed:{
        totalPrice:function(){
         this.chartData.map(el=>{
                this.total+= el.price*el.quantity
            })
            console.log('ini totalpirce',this.total)
            return this.total
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