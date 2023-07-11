import React, { useEffect, useState } from 'react'

function Alert(props) {

  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'error'
    }
    let lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }

  const [verify, setVerify] = useState(props.alert)
  useEffect(() => {
    setVerify(props.alert)
  }, [props.alert])

  return (
    <div style={{ height: '50px' }} className='sticky-top'>
      {verify !== null &&  // Damn importent syntex, here it means props.alert is not null execute below code}
        <div className={`alert alert-${verify.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(verify.type)} </strong> {verify.msg}
          <button type="button" className="btn-close" onClick={() => { setVerify(null) }}></button>
        </div>}

    </div>
  )
}

export default Alert