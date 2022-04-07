import * as React from 'react'
import { Box, TextField, Button, LinearProgress } from '@mui/material'
import { Provider, Consumer } from '@postor/react-form'
import { exists } from './account-exists'
export default function ValidationTextFields() {
  return (<Provider>
    <Consumer>
      {({
        formData,
        validatingFields,
        errorFields,
        register
      }) => (
        <Box>
          <div>
            {(() => {
              let { value, setValue, error, touched, validating } = register(
                "account",
                {
                  validate: async (val) => {
                    if (val.length < 2) throw `name length at least 2`;
                    if (val.length > 6) throw `name length at most 6`;
                    if (await exists(val)) throw `name already exists`;
                  }
                }
              )
              return (
                <div>
                  <TextField
                    error={touched && !validating && !!error}
                    value={value}
                    label="Account"
                    helperText={
                      touched
                        ? validating
                          ? 'validating...'
                          : error
                        : 'enter account'
                    }
                    onChange={e => setValue(e.target.value)}
                    variant="standard"
                  />
                  {validating ? <LinearProgress /> : null}
                </div>
              );
            })()}
          </div>
          <br />
          <Button
            disabled={!!(errorFields.length || validatingFields.length)}
            variant='contained'
            onClick={() => alert(JSON.stringify(formData))}
          >submit</Button>
        </Box>
      )}
    </Consumer>
  </Provider>
  )
}