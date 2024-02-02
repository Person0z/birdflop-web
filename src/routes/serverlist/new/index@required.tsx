import type { QRL } from '@builder.io/qwik';
import { component$, $ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, getValue, useForm, zodForm$ } from '@modular-forms/qwik';
import type { input } from 'zod';
import { Button } from '~/components/elements/Button';
import TextInput from '~/components/elements/TextInput';
import Toggle from '~/components/elements/Toggle';
import { serverSchema } from '~/components/serverlist/schema';

type ServerForm = input<typeof serverSchema>;

export const useFormLoader = routeLoader$<InitialValues<ServerForm>>(() => ({
  name: 'Server Name',
  description: '',
  ip: '',
  port: 25565,
  votifier: false,
  votifierIp: '',
  votifierPort: 8192,
  website: '',
  version: '',
  tags: [],
}));

export const useFormAction = formAction$<ServerForm>((values) => {
  console.log('Form Submitted:', values);
}, zodForm$(serverSchema));

export default component$(() => {

  const [serverForm, { Form, Field }] = useForm<ServerForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(serverSchema),
  });

  const handleSubmit: QRL<SubmitHandler<ServerForm>> = $((values, event) => {
    console.log('Form Submitted:', values);
  });

  return (
    <Form class="flex items-center justify-center mx-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mb-16 mt-5" onSubmit$={handleSubmit}>
      <div class="font-bold text-white text-3xl sm:text-4xl mb-6 items-center justify-center drop-shadow-xl">
        <div class="bg-black/50 border-black/30 border-2 p-8 rounded-xl text-lg font-normal">
          <h1 class="text-center mb-3"></h1>
          <Field name="name">
            {(field, props) => (
              <div>
                <TextInput {...props} type="text" value={field.value} >Server Name</TextInput>
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field name="description">
            {(field, props) => (
              <TextInput big {...props} value={field.value} >Server Description</TextInput>
            )}
          </Field>
          <Field name="ip">
            {(field, props) => (
              <div>
                <TextInput {...props} type="text" value={field.value} >Server IP</TextInput>
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field name="port" type='number'>
            {(field, props) => (
              <div>
                <TextInput {...props} type="number" value={field.value} >Server Port (if you arent using one leave as 25565) </TextInput>
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field name="votifier" type='boolean'>
            {(field, props) => (
              <div>
                <Toggle {...props} value={field.value} >Enable Votifier</Toggle>
              </div>
            )}
          </Field>
          {getValue(serverForm, 'votifier') && (
            <>
              <Field name="votifierIp">
                {(field, props) => (
                  <div>
                    <TextInput {...props} type="text" value={field.value} >Votifier IP</TextInput>
                    {field.error && <div>{field.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="votifierPort" type='number'>
                {(field, props) => (
                  <div>
                    <TextInput {...props} type="number" value={field.value} >Votifier Port</TextInput>
                    {field.error && <div>{field.error}</div>}
                  </div>
                )}
              </Field>
            </>
          )}
          <Field name="website">
            {(field, props) => (
              <div>
                <TextInput {...props} type="text" value={field.value} >Server Website</TextInput>
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field name="version">
            {(field, props) => (
              <div>
                <TextInput {...props} type="text" value={field.value} >Server Version</TextInput>
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Button type="submit" class="mt-4">Submit</Button>
        </div>
      </div>
    </Form>
  );
});

export const head: DocumentHead = {
  title: 'Minecraft Hosting & Resources',
  meta: [
    {
      name: 'description',
      content: 'Minecraft Hosting & Resources',
    },
    {
      name: 'og:description',
      content: 'Minecraft Hosting & Resources',
    },
    {
      name: 'og:image',
      content: 'https://simplymc.art/images/icon.png',
    },
  ],
};