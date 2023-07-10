import { styled } from "..";

export const Container = styled('div', {
    display:'flex',
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent:'center',
    minHeight:'100vh',
})

export const Header = styled('header', {
    padding:'2rem 0',
    width:'100%',
    maxWidth:1180,
    margin:'0 auto',
    display:'flex',
    justifyContent:'space-between',

    svg:{
        background:'$gray800',
        color:'$grayIcon',
        padding:'0.5rem',
        borderRadius:8,

     '&:hover':{
        cursor:'pointer',
        background:'$gray100',
     }
    },
})

export const BarContainer = styled('div', {
    position: 'absolute',
    width:'480px',
    height:'100vh',
    background:'$gray800',
    zIndex:1,
    variants: {
        open: {
          true: {
            right: '0', /* Mostra a sidebar quando aberta */
          },
          false: {
            right: '-480px', /* Esconde a sidebar quando fechada */
          },
        }
    },
    transition: 'right 0.3s ease',
})

export const BarContentContainer = styled('div', {
  margin: '2rem 3rem',
  display:'flex',
  flexDirection:'column',
  height:'36rem',

  h2:{
    fontSize:'$lg',
    marginBottom:'2rem',
    marginTop:'1rem'
  }
})

export const ExitContainer = styled('div', {
  display:'flex',
  justifyContent:'flex-end',

  '&:hover':{
    cursor:'pointer',
  }
})

export const ContainerItems = styled('div', {
  display:'flex',
  flexDirection:'column',
  marginBottom:'1rem'
})

export const FinishContainer = styled('div', {
  margin: '2rem 3rem',
  display:'flex',
  flexDirection:'column',
  gap:'1rem',

  div:{
    display:'flex',
    justifyContent:'space-between',

    h1:
    {
      color:'$gray100',
      fontSize:'$md',
      fontWeight:'bold',
    },
    span:{
      color:'$gray100',
      fontSize:'$md',
      fontWeight:'bold',
    },    
    h2:
    {
      color:'$gray300',
      fontSize:'$xs',
    },    
    h3:
    {
      color:'$gray300',
      fontSize:'$xs',
      fontWeight:'bold',
    }
  },

  button:{
    marginTop:'2.5rem',
    backgroundColor:'$green500',
    border:0,
    color:'$white',
    borderRadius:8,
    padding:'1.25rem',
    cursor:'pointer',
    fontWeight:'bold',
    fontSize:'$md',
    
    '&:hover':{
        backgroundColor: '$green300'
    }

  }

});

export const HandbagContainer = styled('div', {
  position: 'relative',
  display: 'inline-block',

  span:{
    background:'$green300',
    borderRadius:20,
    padding:'0.5rem 0.8rem',
    position: 'absolute',
    top: '-25px',
    right:'-10px',
  },

  svg:{
      background:'$gray800',
      color:'$grayIcon',
      padding:'0.5rem',
      borderRadius:8,

  '&:hover':{
      cursor:'pointer',
      background:'$gray100',
  }
  },
})

export const ProductItemContainer = styled('div', {
  display:'flex',
  gap:'3rem',
  alignItems:'center',

  
  img:{
    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },

  div:{
    display:'flex',
    flexDirection:'column',
    gap:'1rem',

    h1:{
      color:'$gray300',
      fontSize:'$xs',
    },

    span:{
      color:'$gray100',
      fontSize:'$md',
      fontWeight:'bold',
    },

    a:{
      width:'100%',
      color:'$green500',
      fontSize:'$xs',
      fontWeight:'bold',
      background:'none',

      '&:hover':{
        cursor:'pointer'
      }
    }
    
    }
  }
)

  

