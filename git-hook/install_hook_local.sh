if [ ! -f ../.git/hooks/pre-commit.local ]; then
   mv ../.git/hooks/pre-commit ../.git/hooks/pre-commit.local 2>/dev/null
fi
cp pre-commit ../.git/hooks
chmod +x ../.git/hooks/*
