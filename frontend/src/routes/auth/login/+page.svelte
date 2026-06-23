<script>
  import {
    Card, CardBody, Form, FormGroup, Label, Input,
    InputGroup, InputGroupText, Button
  } from '@sveltestrap/sveltestrap';

  let { form } = $props();
</script>


<div class="page d-flex align-items-center justify-content-center p-4">
  <div class="wrap">

    <!-- Logo -->
    <div class="logo d-flex align-items-center justify-content-center gap-2 mb-4">
      <i class="bi bi-music-note-beamed text-white fs-1"></i>
      <h1 class="text-white fw-bold m-0">SoundBox</h1>
    </div>

    <Card class="card">
      <CardBody class="body">
        <h2 class="fw-bold mb-1">Welcome back</h2>
        <p class="text-secondary mb-4">Sign in to your account</p>

        <Form method="POST" action="?/login">

          <FormGroup>
            <Label for="email">Email Address</Label>
            <InputGroup>
              <InputGroupText><i class="bi bi-envelope"></i></InputGroupText>
              <Input
                id="email"
                name="email"
                type="email"
                value={form?.email ?? ''}
                placeholder="Enter email address"
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

          <Button type="submit" color="primary" class="button">
            Submit
          </Button>
        </Form>

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
</style>