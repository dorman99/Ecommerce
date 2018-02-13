new Vue({
    el: "#app",
    data: {
        features:{
            tagline:'ayo jajan',
            home    : 'home',
            profile : 'Profile',
            signIn  : 'Sign In',
            logout  : 'Log out',
            showcategories :'Show Categories',
            showitems:'Show Items'
        },
        items :[],
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
        login:()=>{
            //axios get item , user jga
            console.log('masuk sini login')
            $("#mainmenu").toggle('slow',()=>{
            $("#mychart").toggle('slow',()=>{
          console.log('masukl')
        })
    })
            $("#signin").toggle('slow',()=>{
            $("#logout").toggle('slow',()=>{
            console.log('mausk')
      })
    })
            $("#signinmodal").removeClass('is-active')
        },
        logout:()=>{
            $("#mainmenu").toggle('slow',()=>{
      
            })
            $("#logout").toggle('slow',()=>{
              $("#signin").toggle('slow',()=>{
                $("#mychart").toggle('slow',()=>{
                  console.log('masukl')
                })
              })
            })
        },
        modalSignIn:()=>{
            $("#signinmodal").addClass('is-active')
        }
    }
  }
)