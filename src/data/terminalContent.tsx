import React from 'react';

export type OutputLineType = 'normal' | 'comment' | 'dim' | 'accent' | 'list' | 'system' | 'link' | 'divider';

export interface OutputLine {
  type: OutputLineType;
  value: string | React.ReactNode;
  href?: string; // used if type is 'link'
}

export interface TerminalCommand {
  command: string;
  output: OutputLine[];
}

export interface SectionContent {
  id: string;
  title: string;
  commands: TerminalCommand[];
}

export const terminalContent: Record<string, SectionContent> = {
  home: {
    id: 'home',
    title: 'HOME',
    commands: [
      {
        command: '$ cat welcome.sh',
        output: [
          { type: 'system', value: 'Inizializzazione sottosistema T0SHIRO_OS... [OK]' },
          { type: 'system', value: 'Bypass protocollo di sicurezza... [OK]' },
          { type: 'normal', value: '' },
          { type: 'accent', value: <span style={{ fontWeight: 'bold' }}>{`  ┌┬┐┌─┐┌─┐┬ ┬┬┬─┐┌─┐
   │ ├─┤├─┤├─┤│├┬┘│ │
   ┴ ┴ ┴┴ ┴┴ ┴┴┴└─└─┘`}</span> },
          { type: 'comment', value: '// "Security is not a product, but a process."' },
          { type: 'normal', value: '' },
          { type: 'system', value: '[ SYSTEM STATUS ]' },
          { type: 'list', value: '> CPU USAGE : [||||||||    ] 28%' },
          { type: 'list', value: '> RAM USAGE : 2.4G / 16.0G' },
          { type: 'list', value: '> NETWORK   : ENCRYPTED (PORT 443)' },
          { type: 'list', value: '> THREATS   : ZERO DETECTED' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// PROFILO ATTUALE' },
          { type: 'list', value: 'Nome: Raffaele Rossetti (T0shiro94)' },
          { type: 'list', value: 'Ruolo: Ethical Hacker // Studente Ingegneria Informatica' },
          { type: 'list', value: 'Focus: Cybersecurity, Linux, Networking, Software Engineering' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// MISSION' },
          { type: 'dim', value: 'Costruire, decostruire e proteggere sistemi complessi.' },
          { type: 'dim', value: 'Sviluppo di tool di automazione AI-assisted.' },
          { type: 'normal', value: '' },
          { type: 'system', value: '# Usa la barra di navigazione sottostante per esplorare i moduli.' }
        ],
      },
    ],
  },
  progetti: {
    id: 'progetti',
    title: 'PROGETTI',
    commands: [
      {
        command: '$ ls -la ~/projects/',
        output: [
          { type: 'system', value: 'Lettura directory /home/t0shiro94/projects...' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// SECURITY & NETWORKING LABS' },
          { type: 'list', value: '> network_recon.sh (Script di automazione per mapping porte e servizi)' },
          { type: 'list', value: '> vuln_scanner_core.py (Motore di scansione vulnerabilità asincrono)' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// WEB & SOFTWARE ENGINEERING' },
          { type: 'list', value: '> T0SHIRO_OS (Questo portfolio terminal-based React/Vite)' },
          { type: 'list', value: '> secure_auth_gateway (POC di un sistema di autenticazione zero-trust)' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// AI & AUTOMATION' },
          { type: 'list', value: '> ai_threat_analyzer (Workflow AI-assisted per analisi di log)' },
          { type: 'normal', value: '' },
          { type: 'dim', value: 'NOTA: Alcuni moduli sono in fase di sviluppo (stealth mode).' }
        ],
      },
    ],
  },
  skills: {
    id: 'skills',
    title: 'SKILLS',
    commands: [
      {
        command: '$ cat /etc/skills.conf',
        output: [
          { type: 'system', value: 'Caricamento matrice delle competenze...' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// CYBERSECURITY & ETHICAL HACKING' },
          { type: 'list', value: '- Penetration Testing & Vulnerability Assessment' },
          { type: 'list', value: '- Networking Analysis (TCP/IP, Wireshark, Nmap)' },
          { type: 'list', value: '- Utilizzo avanzato di Kali Linux, Metasploit, Burp Suite' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// PROGRAMMAZIONE & SVILUPPO' },
          { type: 'list', value: '- Python (Scripting, Sicurezza, Automazione)' },
          { type: 'list', value: '- Bash Scripting' },
          { type: 'list', value: '- React, Vite, TypeScript (Web Development Frontend)' },
          { type: 'list', value: '- C/C++ (Fondamenti di sistema)' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// SISTEMI & WORKFLOW' },
          { type: 'list', value: '- GNU/Linux (Hardening, Amministrazione)' },
          { type: 'list', value: '- AI-Assisted Workflows' },
          { type: 'list', value: '- Problem Solving analitico' },
          { type: 'normal', value: '' },
          { type: 'system', value: '# continuous learning enabled = true' }
        ],
      },
    ],
  },
  labs: {
    id: 'labs',
    title: 'LABS',
    commands: [
      {
        command: '$ tail -f /var/log/training.log',
        output: [
          { type: 'system', value: 'Monitoraggio log attività di laboratorio...' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// HACK THE BOX & TRYHACKME' },
          { type: 'list', value: '- Pratica costante su macchine virtuali vulnerabili (Windows/Linux)' },
          { type: 'list', value: '- Risoluzione di scenari reali di Privilege Escalation e Lateral Movement' },
          { type: 'list', value: '- Partecipazioni a sfide crittografiche e web exploitation' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// AMBIENTI PRATICI' },
          { type: 'list', value: '- Setup di laboratori di virtualizzazione per test di malware' },
          { type: 'list', value: '- Analisi di traffico di rete e simulazione attacchi MITM' },
          { type: 'list', value: '- Sperimentazione su vulnerabilità OWASP Top 10 in locale' },
          { type: 'normal', value: '' },
          { type: 'dim', value: '-> "L\'unica vera conoscenza deriva dalla pratica."' }
        ],
      },
    ],
  },
  cv: {
    id: 'cv',
    title: 'CV',
    commands: [
      {
        command: '$ cat ~/docs/resume.md',
        output: [
          { type: 'accent', value: 'RAFFAELE ROSSETTI (T0shiro94)' },
          { type: 'normal', value: 'Ethical Hacker | Studente di Ingegneria Informatica' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// FORMAZIONE ACADEMICA' },
          { type: 'divider', value: '' },
          { type: 'normal', value: 'INFORMATICA E INGEGNERIA DEL SOFTWARE' },
          { type: 'dim', value: 'Studente di Ingegneria Informatica. Focus teorico e pratico su architetture hardware/software, reti, algoritmi e sicurezza dei sistemi. (In corso)' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// PERCORSO TECNICO & PROGETTI' },
          { type: 'divider', value: '' },
          { type: 'normal', value: 'RICERCATORE DI SICUREZZA INDIPENDENTE' },
          { type: 'dim', value: '- Pratica costante su piattaforme di simulazione hacking (HTB, THM).' },
          { type: 'dim', value: '- Sviluppo di script Python/Bash per l\'automazione di fasi di enumeration.' },
          { type: 'normal', value: '' },
          { type: 'normal', value: 'SVILUPPATORE E IT ENTHUSIAST' },
          { type: 'dim', value: '- Creazione di web app moderne (es. questo terminal OS).' },
          { type: 'dim', value: '- Amministrazione di server Linux e hardening dei sistemi personali.' }
        ],
      },
    ],
  },
  contatti: {
    id: 'contatti',
    title: 'CONTATTI',
    commands: [
      {
        command: '$ ./establish_connection.sh',
        output: [
          { type: 'system', value: 'Inizializzazione socket per comunicazioni...' },
          { type: 'system', value: 'Handshake SSL/TLS completato.' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// PROTOCOLLI DI CONTATTO' },
          { type: 'link', value: '[GITHUB]   github.com/t0shiro94', href: 'https://github.com/t0shiro94' },
          { type: 'link', value: '[LINKEDIN] linkedin.com/in/raffaele-rossetti-placeholder', href: 'https://linkedin.com/in/raffaele-rossetti-placeholder' },
          { type: 'link', value: '[EMAIL]    raffaele.placeholder@email.com', href: 'mailto:raffaele.placeholder@email.com' },
          { type: 'normal', value: '' },
          { type: 'comment', value: '// COMUNICAZIONE CRIPTATA DIRETTA' },
          { type: 'link', value: '> launch whatsapp://chat', href: 'https://wa.me/390000000000' }
        ],
      },
    ],
  },
};
