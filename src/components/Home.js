const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo ao Sommelier Path - Ferramenta de Configuração de Provas de Vinho</h1>
      <p>
        O <span style={styles.highlight}>Caminho do Sommelier</span> é uma ferramenta intuitiva concebida para ajudar os
        entusiastas e profissionais do vinho a criar e personalizar experiências de prova de vinhos. Quer esteja a
        organizar um evento de degustação de vinhos ou a criar um guia de degustação pessoal, o Sommelier Path
        permite-lhe configurar todos os aspetos da experiência de degustação. Desde a seleção de tipos de vinho e
        definição do peso do aroma até ao fornecimento de dicas de temperatura, a nossa ferramenta dá-lhe controlo total
        sobre os detalhes do seu evento.
      </p>

      <h2 style={styles.sectionTitle}>Caraterísticas Principais</h2>
      <ul>
        <li>
          <span style={styles.highlight}>Configurações de degustação personalizáveis:</span> Defina atributos como tipo
          de degustação, aroma, cor, peso do sabor e muito mais.
        </li>
        <li>
          <span style={styles.highlight}>Gestão de participantes:</span> Ajuste o número de participantes, a duração e o
          local para atender às necessidades específicas do seu evento.
        </li>
        <li>
          <span style={styles.highlight}>Sugestões de vinhos e combinações:</span> Adicione dicas de temperatura e
          sugestões de harmonização para melhorar a experiência de degustação.
        </li>
        <li>
          <span style={styles.highlight}>Métodos de degustação personalizados:</span> Escolha entre vários métodos de
          degustação e níveis de apreciação adequados a diferentes estilos de degustação de vinhos.
        </li>
      </ul>

      <h2 style={styles.sectionTitle}>Como Começar</h2>
      <ol>
        <li>
          Navegue até à secção <span style={styles.highlight}>Configuração</span> para criar a sua configuração de prova
          personalizada.
        </li>
        <li>
          Utilize o <span style={styles.highlight}>Formulário</span> para introduzir detalhes como o tipo de vinho, as
          preferências de aroma e a duração da prova.
        </li>
        <li>
          Guarde e reveja as suas configurações para garantir que cumprem as suas especificações exatas.
        </li>
      </ol>

      <p>
        Quer seja um sommelier experiente ou um entusiasta de vinhos casual, o Sommelier Path permite-lhe criar eventos
        de prova de vinhos memoráveis, adaptados às suas preferências.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  highlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: '30px',
    marginBottom: '15px',
    fontSize: '1.5em',
    color: '#333',
  },
};

export default Home;
