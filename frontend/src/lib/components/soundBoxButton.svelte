<script>

  let { label = "SoundBox", href = "/user/id/dashboard" } = $props();
</script>

<a {href} class="soundbox-btn" aria-label="{label}, go to dashboard">
  <span class="needle" aria-hidden="true"></span>
  <span class="label">{label}</span>
</a>

<style>
  .soundbox-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: var(--paper);
    background: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.55rem 1.2rem 0.55rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--accent);
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.2s ease;
  }

  .soundbox-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(193, 80, 46, 0.35);
  }

  .needle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--paper);
    flex-shrink: 0;
    position: relative;
  }

  /* Little tonearm flick on hover -- nods to a turntable needle dropping */
  .needle::after {
    content: "";
    position: absolute;
    top: -3px;
    left: 6px;
    width: 2px;
    height: 10px;
    background: var(--paper);
    transform-origin: top left;
    transform: rotate(28deg);
    transition: transform 0.25s ease;
  }

  .soundbox-btn:hover .needle::after {
    transform: rotate(8deg);
  }

  .label {
    line-height: 1;
  }
</style>