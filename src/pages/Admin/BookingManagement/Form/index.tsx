import { Space, Typography } from 'antd';
import React from 'react';

const { Text, Link } = Typography;

const App: React.FC<{ data: Booking | null, mode: Mode, setMode: React.Dispatch<React.SetStateAction<Mode>> }> = ({ data, mode, setMode }) => {
  return (<Space vertical>
    <Link href="https://ant.design" target="_blank">
      {data?.customer.name}
    </Link>
  </Space>);
}

export default App;