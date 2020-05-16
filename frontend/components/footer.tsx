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
        </div>
    );
};

export default MyFooter;