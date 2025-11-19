import { useMemo } from "react";

const EmbedCode = ({ spaId }) => {
  const code = useMemo(
    () => `<script>
  const spaId = "${spaId}";
  (function(){
    const s = document.createElement('script');
    s.src = 'https://chatbot.yourdomain.com/bot.js?spa=' + spaId;
    s.async = true;
    document.body.appendChild(s);
  })();
</script>`,
    [spaId]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  if (!spaId) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Embed Code</p>
          <p className="text-sm text-slate-500">
            Copy and paste into any spa site
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white"
        >
          Copy
        </button>
      </div>
      <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-200">
        {code}
      </pre>
    </div>
  );
};

export default EmbedCode;

