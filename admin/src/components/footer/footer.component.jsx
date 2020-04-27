import React from 'react';

import { Icon } from 'react-icons-kit'
import { ic_copyright } from 'react-icons-kit/md/ic_copyright'

import './footer.component.scss'

const Footer = () => (
  <div className={'footer'}>
    <div className={'copyright'}>
      <Icon icon={ic_copyright} />
      <span>2020 D2TRADE all rights reserved.</span>
    </div>
  </div>
)

export default Footer