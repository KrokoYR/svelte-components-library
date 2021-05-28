<script lang="ts">
  import '../../index.css';

  export let error: string = '';
  export let label: string;
  export let helpText: string;

  const errorTextColor = 'text-red-900';
  const defaultClasses =
    'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md';
  const errorClasses = `block w-full pr-10 border-red-300 ${errorTextColor} placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`;
</script>

<div>
  <label for="email" class="block text-sm font-medium text-gray-700">
    {label}
  </label>
  <div class="mt-1 relative rounded-md shadow-sm">
    <input
      type="text"
      name="email"
      id="email"
      class={`${defaultClasses} ${error && errorClasses}`}
      placeholder="you@example.com"
      autocomplete="off"
    />

    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <slot name="icon" />
    </div>
  </div>
  <p
    class={`mt-2 text-sm text-gray-500 ${error && errorTextColor}`}
    id="email-description"
  >
    <slot name="helpText">
      {error || helpText}
    </slot>
  </p>
</div>
