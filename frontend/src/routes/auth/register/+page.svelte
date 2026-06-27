<script>
  import { goto } from '$app/navigation'; 
  import {
    Card, CardBody, Form, FormGroup, Label, Input,
    InputGroup, InputGroupText, Button
  } from '@sveltestrap/sveltestrap';

  let { form } = $props();

  $effect(() => {
    if (form?.success) {
      alert(form.message ?? 'Successfully registered!');
      goto('/auth/login');
    }
  });
</script>


<div class="page d-flex align-items-center justify-content-center p-4">
  <div class="wrap">
    <div class="logo d-flex align-items-center justify-content-center gap-2 mb-4">
      <i class="bi bi-music-note-beamed text-white fs-1"></i>
      
      <h1 class="text-white fw-bold m-0">SoundBox</h1>
    </div>

    <Card class="card">
      <CardBody class="body">
        <h2 class="fw-bold">Create an account</h2>
        <Form method="POST" action="?/register">

          <FormGroup>
            <Label for="username">Username</Label>
            <InputGroup>
              <InputGroupText><i class="bi bi-person"></i></InputGroupText>
              <Input
                id="username"
                name="username"
                type="text"
                value={form?.username ?? ''}
                placeholder="Enter username"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="email">Email Address</Label>
            <InputGroup>
              <InputGroupText><i class="bi bi-envelope"></i></InputGroupText>
              <Input
                id="email"
                name="email"
                type="email"
                value={form?.email ?? ''}
                placeholder="Enter Email Address"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <InputGroup>
              <InputGroupText><i class="bi bi-lock"></i></InputGroupText>
              <Input
                id="password"
                name="password"
                type="password"
                value={form?.password ?? ''}
                placeholder="Enter password"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input id="gender" name="gender" type="select">
              <option value="Male" selected={form?.gender === 'Male'}>Male</option>
              <option value="Female" selected={form?.gender === 'Female'}>Female</option>
              <option value="NonBinary" selected={form?.gender === 'NonBinary'}>Non-Binary</option>
              <option value="GenderFluid" selected={form?.gender === 'GenderFluid'}>GenderFluid</option>
              <option value="Other" selected={form?.gender === 'Other'}>Other</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="role">Role</Label>
            <Input id="role" name="role" type="select">
              <option value="ADMIN" selected={form?.role === 'ADMIN'}>Admin</option>
              <option value="USER" selected={form?.role === 'USER'}>User</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              value={form?.bio ?? ''}
              placeholder="A short bio about who you are to put on your profile (can be added later)"
            />
          </FormGroup>

          <Button type="submit" color="primary" class="button">
            Submit
          </Button>
        </Form>
        <p class="text-center text-secondary mt-4">Not with us?</p>
        <div class="text-center">
          <a data-sveltekit-reload href="/auth/login" class="login-link">
            Login Here
          </a>
        </div>
      </CardBody>
    </Card>


    {#if form?.success}
      <p>{form.message}</p>
    {/if}

    {#if form?.success === false}
      <p>{form.error}</p>
    {/if}
  </div>
</div>


<style>
  .page {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #a855f7, #db2777);
  }
    .login-link {
    color: #a855f7;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
  }

  .login-link:hover {
    color: #db2777;
    border-bottom-color: #db2777;
  }
</style>