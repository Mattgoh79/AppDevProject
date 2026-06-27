<script>

  let {
    size = "2.2rem",
    label = "Loading",
    fullscreen = false,
  } = $props();
</script>

{#if fullscreen}
  <div class="loading-overlay" role="status" aria-live="polite">
    <span class="disc" style="width:{size}; height:{size};" aria-hidden="true">
      <span class="hole"></span>
    </span>
    <span class="sr-only">{label}</span>
  </div>
{:else}
  <div class="loading-inline" role="status" aria-live="polite">
    <span class="disc" style="width:{size}; height:{size};" aria-hidden="true">
      <span class="hole"></span>
    </span>
    <span class="sr-only">{label}</span>
  </div>
{/if}

<style>
  .loading-inline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .loading-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(244, 241, 234, 0.6);
    z-index: 1000;
  }

  .disc {
    position: relative;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle,
      #1c1a18 0px,
      #1c1a18 2px,
      var(--accent) 2px,
      var(--accent) 4px
    );
    animation: spin 0.9s linear infinite;
  }

  .hole {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28%;
    height: 28%;
    background: var(--paper);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .disc {
      animation: none;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
</style>