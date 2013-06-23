import argparse
import subprocess
import sys


def parse_args():
  parser = argparse.ArgumentParser(description='Upload book data to server.')
  parser.add_argument('filename', metavar='filename', type=str,
                      help='The file name of book data.')
  parser.add_argument('--host', dest='host', type=str,
                      help='The name of host to which upload book data.')
  args = parser.parse_args()
  if not args.host:
    print 'host need to be specified.'
    parser.print_help()
    return None
  return args


def main():
  args = parse_args()
  if not args:
    return -1
  cmd = ['appcfg.py',
         'upload_data',
         '--config_file=bulkloader.yaml',
         '--filename=' + args.filename,
         '--kind=Book',
         '--url=http://%s/_ah/remote_api' % args.host]
  try:
    subprocess.check_call(cmd)
  except subprocess.CalledProcessError:
    print 'Command failed: ' + ' '.join(cmd)
    return -1
  return 0


if __name__ == '__main__':
  sys.exit(main())
