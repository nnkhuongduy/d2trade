import React from 'react';

import { Icon } from '@iconify/react';
import copyrightIcon from '@iconify/icons-fa-solid/copyright';
import steamIcon from '@iconify/icons-cib/steam';
import twitterCircleFilled from '@iconify/icons-ant-design/twitter-circle-filled';
import facebookIcon from '@iconify/icons-cib/facebook';

import './footer.component.scss';


const Footer = () => (
  <div className="footer">
    <div className="copyright">
      <Icon icon={copyrightIcon} />
      <span>2020 D2TRADE.COM All rights reserved.</span>
    </div>
    <div className="footer-socials">
      <Icon icon={steamIcon} width="1.5em" height="1.5em" />
      <Icon icon={twitterCircleFilled} width="1.5em" height="1.5em" />
      <Icon icon={facebookIcon} width="1.5em" height="1.5em" />
    </div>
  </div>
)

export default Footer;