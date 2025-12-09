'use client';

import { useEffect, useRef, useState } from 'react';

const resumeData = {
  name: 'Alejandro De La Mora',
  role: 'AI Solutions Architect & Senior Developer',
  contact: {
    phone: '+1 437 243 3693',
    email: 'alex@seshwithfriends.org',
    linkedin: 'linkedin.com/in/amorac',
    website: 'eloruga.com/about/index.html',
    github: 'github.com/Oruga420',
  },
  summary:
    'AI Solutions Architect and Senior Developer with a proven track record of shipping GenAI that works in production. Expert in architecting LLM workflows, Agentic systems, and RAG solutions that have saved over $1M USD and 20,000+ man-hours annually. Experienced in bridging the gap between Python development, Cloud Architecture (GCP, AWS), and enterprise automation. Passionate educator and community leader who has designed over 120 GenAI applications and driven internal AI adoption from 47% to 97%.',
  areasOfExpertise: [
    'Python',
    'Next.js',
    'Salesforce',
    'SQL',
    'LLMs (OpenAI, Anthropic, Gemini)',
    'RAG',
    'Agentic Workflows',
    'Prompt Engineering',
    'Cloud (GCP, AWS)',
    'CI/CD',
    'Model Context Protocol (MCP)',
    'Team Leadership & Mentorship',
  ],
  experiences: [
    {
      title: 'AI Solutions Architect',
      company: 'Assent',
      location: 'Canada',
      period: 'Feb 2025 - Present',
      bullets: [
        'Architecting a secure GenAI stack using OpenAI, Anthropic, and Gemini with live RAG connections into compliance data and agentic workflows.',
        'Achieved over 20,000 man-hours in savings by deploying internal tools and automations to replace repetitive operational tasks.',
        'Increased internal AI adoption from 47% to 97% through MCP tools that enabled safe movement from prototype to production.',
        'Built custom MCP servers to expose data and tools safely, pairing strict security controls with developer velocity.',
      ],
    },
    {
      title: 'AI Solutions Architect',
      company: 'Sesh | Ai Solutions',
      location: 'Toronto, Ontario',
      period: 'Nov 2021 - Present',
      bullets: [
        'Designed architecture for over 120 GenAI applications across 30+ clients, delivering 90+ productive chatbots.',
        'Led a community of 100+ members with mentorship, tutorials, and open office hours; delivered talks for Latinas in Tech and Somos Latinos in Tech Ottawa.',
        'Implemented GenAI-powered workflows for small businesses, integrating CRMs and marketing sites with backend automation.',
      ],
    },
    {
      title: 'Salesforce Consultant',
      company: 'Online Business Systems',
      location: 'Toronto, Ontario',
      period: 'Jun 2024 - Nov 2024',
      bullets: [
        'Specialized in Agentforce and Marketing Cloud Account Engagement, configuring AI assistants and copilot experiences.',
        'Defined use cases and wired data access for AI agents, aligning assistants with operational workflows.',
        'Developed reusable patterns to accelerate client onboarding and reduce development overhead.',
      ],
    },
    {
      title: 'Salesforce Manager',
      company: 'Globalization Partners',
      location: 'Ontario, Canada',
      period: 'Nov 2018 - Nov 2023',
      bullets: [
        "Led a GenAI-focused development stream, building 'GIA' (internal chatbot) and AI-powered Jira ticket workflows.",
        'Managed a large Salesforce org with 1,000+ licenses, combining platform ownership with agile delivery.',
        "Pioneered 'vibe coding' patterns and AI-assisted development practices under strict governance.",
      ],
    },
  ],
  education: [
    {
      degree: 'Ingenieria en Sistemas',
      school: 'Universidad Marista de MAcrida',
      period: '2004 - 2007',
    },
    {
      degree: 'Certifications',
      school: 'Salesforce Certified AI Associate; Salesforce Certified Administrator (SCA)',
      period: '',
    },
  ],
  achievements: [
    '$1M+ cost savings via Agentic Workflows and GenAI automations.',
    'Founder of a 100+ person community dedicated to AI fluency with free classes and practical training.',
  ],
};

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSrc = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float wave = sin(st.x * 6.28318 + u_time * 0.5) * 0.04;
        float ripple = sin((st.y + wave) * 10.0 + u_time * 0.8) * 0.02;
        float gradient = st.y + wave + ripple;
        vec3 top = vec3(0.86, 0.93, 1.0);
        vec3 mid = vec3(0.50, 0.72, 1.0);
        vec3 deep = vec3(0.16, 0.36, 0.78);
        vec3 color = mix(top, mid, clamp(gradient, 0.0, 1.0));
        color = mix(color, deep, smoothstep(0.4, 1.0, gradient));
        gl_FragColor = vec4(color, 0.9);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexSrc);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSrc);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId;
    const render = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden />;
}

function PDFDownloadButton({ resumeRef }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current || downloading) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, jsPDFModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const JsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f7faff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('alejandro-de-la-mora-resume.pdf');
    } catch (error) {
      console.error('PDF download failed', error);
      alert('Unable to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button className="pdf-button" onClick={handleDownload} type="button" disabled={downloading}>
      {downloading ? 'Preparing PDF…' : 'Download as PDF'}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Experience({ item }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-subtitle">
            {item.company} • {item.location}
          </p>
        </div>
        <span className="pill pill-ghost">{item.period}</span>
      </div>
      <ul className="list">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  const resumeRef = useRef(null);

  return (
    <main className="page-root">
      <AnimatedBackground />
      <div className="page" ref={resumeRef}>
        <header className="header">
          <div>
            <p className="role">{resumeData.role}</p>
            <h1 className="name">{resumeData.name}</h1>
          </div>
          <div className="contact-card">
            <p className="contact-label">Contact</p>
            <p className="contact-item">{resumeData.contact.phone}</p>
            <p className="contact-item">{resumeData.contact.email}</p>
            <p className="contact-item">{resumeData.contact.linkedin}</p>
            <p className="contact-item">{resumeData.contact.website}</p>
            <p className="contact-item">{resumeData.contact.github}</p>
          </div>
        </header>

        <Section title="Professional Summary">
          <div className="card summary-card">
            <p>{resumeData.summary}</p>
            <div className="chips">
              {resumeData.achievements.map((achievement) => (
                <span className="pill" key={achievement}>
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Areas of Expertise">
          <div className="chips">
            {resumeData.areasOfExpertise.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Work Experience">
          <div className="stack">
            {resumeData.experiences.map((experience) => (
              <Experience item={experience} key={`${experience.title}-${experience.company}`} />
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="grid">
            {resumeData.education.map((edu) => (
              <div className="card" key={edu.degree}>
                <h3 className="card-title">{edu.degree}</h3>
                <p className="card-subtitle">{edu.school}</p>
                {edu.period && <p className="card-detail">{edu.period}</p>}
              </div>
            ))}
          </div>
        </Section>
      </div>
      <div className="actions">
        <PDFDownloadButton resumeRef={resumeRef} />
      </div>
    </main>
  );
}
