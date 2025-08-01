import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https:/E-Commerce/" target="_blank" rel="noopener noreferrer">
        E-Commerce
        </a>
        <span className="ms-1">&copy; 2025 .</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://E-Commerce/" target="_blank" rel="noopener noreferrer">
        E-Commerce
        </a>
      </div>      
    </CFooter>
  )
}

export default React.memo(AppFooter)
