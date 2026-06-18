<script>
  let { form } = $props();
</script>

<h1>Register</h1>

<form method="POST" action="?/register">
  <label for="username">Username:</label>
  <input
    id="username"
    name="username"
    type="text"
    value={form?.username ?? ''}
    placeholder="Enter username"
  />

  <label for="email">Email Address:</label>
  <input
    id="email"
    name="email"
    type="email"
    value={form?.email ?? ''}
    placeholder="Enter Email Address"
  />

  <label for="password">Password:</label>
  <input
    id="password"
    name="password"
    type="password"
    value={form?.password ?? ''}
    placeholder="Enter password"
  />

  <label for="gender">Gender:</label>
  <select id="gender" name="gender">
    <option value="Male" selected={form?.gender === 'Male'}>Male</option>
    <option value="Female" selected={form?.gender === 'Female'}>Female</option>
    <option value="NonBinary" selected={form?.gender === 'NonBinary'}>Non-Binary</option>
    <option value="GenderFluid" selected={form?.gender === 'GenderFluid'}>GenderFluid</option>
    <option value="Other" selected={form?.gender === 'Other'}>Other</option>
  </select>

  <label for="role">Role:</label>
  <select id="role" name="role">
    <option value="ADMIN" selected={form?.role === 'ADMIN'}>Admin</option>
    <option value="USER" selected={form?.role === 'USER'}>User</option>
  </select>

  <label for="bio">Bio:</label>
  <input
    id="bio"
    name="bio"
    type="bio"
    value={form?.bio ?? ''}
    placeholder="A short bio about who you are to put on your profile (can be added later)"
  />
  <button type="submit">Submit</button>
</form>

{#if form?.success}
  <p>{form.message}</p>
{/if}

{#if form?.success === false}
  <p>{form.error}</p>
{/if}