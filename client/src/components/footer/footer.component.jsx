import React from 'react';

import { Icon } from '@iconify/react';
import copyrightIcon from '@iconify/icons-fa-solid/copyright';
import flagForFlagUsOutlyingIslands from '@iconify/icons-emojione/flag-for-flag-us-outlying-islands';
import themeLightDark from '@iconify/icons-mdi/theme-light-dark';
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
    <div className="footer-nav">
      <a href="/">Terms & Use</a>
      <a href="/">Privacy policy</a>
      <a href="/">FAQ</a>
    </div>
    <div className="footer-setting">
      <Icon icon={flagForFlagUsOutlyingIslands} width="2em" height="2em" />
      <Icon icon={themeLightDark} width="2em" height="2em" />
    </div>
    <div className="footer-socials">
      <Icon icon={steamIcon} width="1.5em" height="1.5em" />
      <Icon icon={twitterCircleFilled} width="1.5em" height="1.5em" />
      <Icon icon={facebookIcon} width="1.5em" height="1.5em" />
    </div>
  </div>
)

export default Footer;