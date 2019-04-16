import React from 'react'
import Simplert from 'react-simplert'



class Testing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSimplert:false
  }
}
demoAlert() {
  console.log("Demo");  
  this.setState({showSimplert:true})
}
  render() {
    return (
      <>
        <button onClick={() => { this.demoAlert() }} >fsdfds</button>
        <Simplert showSimplert={ this.state.showSimplert } message={"demo"}/>
      </>
    )
  }
}
export default Testing;