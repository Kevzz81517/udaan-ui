import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <>
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Loan Application Status"
        loading={loading}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Loan Repayment"
        loading={loading}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
  </Row>
  <Row>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Apply For New Loan"
        loading={loading}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Active Loans"
        loading={loading}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
  </Row>
  </>
);

export default IntroduceRow;
