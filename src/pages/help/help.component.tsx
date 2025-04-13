import './help.component.scss';
import React from 'react';
import { Collapse, Button, Typography, Space, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;

const HelpComponent = () => {
  return (
    <div className="faq-container mt-40">
      <div className="text-center">
        <Title>Kömək lazımdır?</Title>
        <Paragraph>
          Biz həmişə sizə kömək etməyə hazırıq! Tez-tez verilən suallarımıza nəzər salın.
          Suallarınızın cavabını burada tapın.
        </Paragraph>
      </div>

      <Button type="primary" size="large" className="send-message-button" style={{backgroundColor:'green'}}>
        Mesaj göndər
      </Button>

      <Title level={2}>Suallarınızı cavablandırırıq!</Title>

      <Collapse>
        <Panel header="Agromarket nədir?" key="1">
          <Paragraph>Agromarket haqqında məlumat</Paragraph>
        </Panel>
        <Panel header="Agromarket-də kim sata bilər?" key="2">
          <Paragraph>Satıcı məlumatları</Paragraph>
        </Panel>
        <Panel header="Agromarket-də kim ala bilər?" key="3">
          <Paragraph>Alıcı məlumatları</Paragraph>
        </Panel>
        <Panel
          header="İstehsalçı kimi qeydiyyatdan keçdikdən sonra platformada alış-veriş edə bilərəmmi?"
          key="4"
        >
          <Paragraph>Qeydiyyat məlumatları</Paragraph>
        </Panel>
        <Panel
          header="Veb saytda konfiqurasiya problemi var, kimlə əlaqə saxlamalıyam?"
          key="5"
        >
          <Paragraph>Texniki dəstək məlumatları</Paragraph>
        </Panel>
        <Panel header="Platformada sifarişlər necə faktura edilir?" key="6">
          <Paragraph>Faktura məlumatları</Paragraph>
        </Panel>
      </Collapse>

      <div className="contact-info">
        <Divider />
        <Paragraph>
          Biz həftə içi, səhər 9:00-dan axşam 7:00-a qədər xidmətinizdəyik.
        </Paragraph>

        <Space direction="vertical" className="contact-details">
          <Title level={3}>Əlaqə</Title>
          <Text strong>707 451 451</Text>
          <Paragraph>
            Sabit şəbəkələrdən zənglər üçün dəqiqəsi maksimum: 0.09€ (+ƏDV)
            Mobil şəbəkələrdən zənglər üçün dəqiqəsi maksimum: 0.13€ (+ƏDV)
          </Paragraph>

          <Title level={3}>E-poçt</Title>
          <Link href="mailto:apoio@agromarket.pt">apoio@agromarket.pt</Link>

          <Title level={3}>Ünvan</Title>
          <Text>Estrada Regional 104 N.° 42-A, Ribeira Brava</Text>
        </Space>
      </div>
    </div>
  );
};

export default HelpComponent;
