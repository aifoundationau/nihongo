import Image from 'next/image';

export default function Founder() {
  return (
    <section className="section">
      <div className="container founder">
        <div className="founder-photo">
          <div className="founder-frame">
            <Image src="/founder.jpg" alt="David Robertson" width={480} height={480} priority={false} />
          </div>
          <span className="hanko hanko-lg">創業</span>
        </div>
        <div>
          <span className="eyebrow">創業者 · Founder</span>
          <h2>David Robertson</h2>
          <p className="founder-role">Founder, AI Foundation</p>
          <blockquote>
            “Learning a language should feel like a conversation, not a contract. Nihongo Kyoushitsu lets you
            pay only for the lessons you actually watch — and lets great teachers earn from every one.”
          </blockquote>
          <p className="muted">
            Nihongo Kyoushitsu is built by the AI Foundation to make Japanese approachable for everyone,
            one short lesson at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
