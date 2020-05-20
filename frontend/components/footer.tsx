import { Space } from 'antd';
import { GithubFilled, MailFilled } from '@ant-design/icons';

const MyFooter = () => {
    return (
        <div style={{textAlign: "center"}}>
            Evian张的个人博客<br/>
            联系方式：
            <Space>
                <div>
                    GitHub <a href="https://github.com/Evian-Zhang" rel="noopener noreferrer"><GithubFilled/></a>
                </div>
                <div>
                    Gmail <a href="mailto:evianzhang1999@gmail.com"><MailFilled/></a>
                </div>
                <div>
                    知乎 <a href="https://www.zhihu.com/people/Evian_Zhang" rel="noopener noreferrer">勥巭炛</a>
                </div>
                <div>
                    CSDN <a href="https://me.csdn.net/EvianZhang" rel="noopener noreferrer">EvianZhang</a>
                </div>
            </Space><br/>
            ICP备案号: <a href="//www.beian.miit.gov.cn" rel="noopener noreferrer">苏ICP备20025447号</a>
            <div style={{width:"300px",margin:"0 auto", padding:"20px 0"}}>
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010402000944" style={{display:"inline-block",textDecoration:"none",height:"20px",lineHeight:"20px"}}><img src="/备案图标.png" style={{float:"left"}}/><p style={{float:"left",height:"20px",lineHeight:"20px",margin: "0px 0px 0px 5px", color:"#939393"}}>苏公网安备 32010402000944号</p></a>
		 	</div>
        </div>
    );
};

export default MyFooter;